import {
    findPrimeFactors, primeFactorsProduct, primeFactorsRoundedDivision,
    primeFactorsSquare, primeFactorsSum
} from "./math"

export enum Operation { MULTIPLY, PLUS, SQUARE }

export type Monkey = {
    holdingItems: Item[]
    worryLevelOperation: WorryLevelOperation,
    testDivisor: number,
    recipientMonkeys: [number, number],
    inpectedItemsCount: number
}

type Item = WorryLevel | WorryLevelPrimeFactors
type WorryLevelPrimeFactors = WorryLevel[]
type WorryLevel = number
type WorryLevelOperation = [Operation, number] | [Operation.SQUARE, null]

const isWorryLevel = (i: Item): i is WorryLevel => typeof i === 'number'
const isWorryLevelPrimeFactors = (i: Item): i is WorryLevelPrimeFactors =>
    Array.isArray(i) && (i.length === 0 || isWorryLevel(i[0]))

const DEFAULT_WORRY_LEVEL_REDUCTION_DIVIDER = 3

export const levelOfMonkeyBusiness = (input: string): number => {
    let monkeys = parseInput(input)
    const inspectedItemCountsForMonkey = inspectedItemCountsForMonkeyWith(monkeys, 20)
    const [first, second] = inspectedItemCountsForMonkey.sort((a, b) => b - a)
    return first * second
}

export const inspectedItemCountsForMonkeyWith = (
    monkeys: Monkey[],
    numberOfRounds: number,
    worryLevelReduceDivider: number = DEFAULT_WORRY_LEVEL_REDUCTION_DIVIDER
): number[] => {
    for (let roundNumber = 0; roundNumber < numberOfRounds; roundNumber++) {
        for (let monkeyNumber = 0; monkeyNumber < monkeys.length; monkeyNumber++) {
            monkeys = processRoundOfMonkeyNumber(monkeyNumber, monkeys, worryLevelReduceDivider)
        }
    }

    return monkeys.map((m) => m.inpectedItemsCount)
}

export const processRoundOfMonkeyNumber = (
    monkeyIndex: number,
    monkeys: Monkey[],
    worryLevelReduceDivider: number = DEFAULT_WORRY_LEVEL_REDUCTION_DIVIDER
): Monkey[] => {
    const newMonkeys: Monkey[] = clone(monkeys)
    const currentMonkey = newMonkeys[monkeyIndex]

    while (currentMonkey.holdingItems.length > 0) {
        const currentItem = currentMonkey.holdingItems.shift()!
        const updatedItem = itemWithNewWorryLevel(currentItem, currentMonkey.worryLevelOperation, worryLevelReduceDivider)
        const recipientMonkey = getRecipientMonkeyFor(updatedItem, currentMonkey)

        newMonkeys[recipientMonkey].holdingItems.push(updatedItem)
        currentMonkey.inpectedItemsCount++
    }

    return newMonkeys
}

export const parseInput = (input: string): Monkey[] => {
    const rows = input.split("\n")
    const parsed: Monkey[] = []
    while (rows.length > 0) {
        const monkeyRows = rows.splice(0, 7)
        const monkey: Monkey = {
            holdingItems: parseHoldingItems(monkeyRows[1]),
            worryLevelOperation: parseWorryLevelOperation(monkeyRows[2]),
            testDivisor: parseTestDivisor(monkeyRows[3]),
            recipientMonkeys: parseRecipientMonkeys(monkeyRows.slice(4, 6)),
            inpectedItemsCount: 0
        }
        parsed.push(monkey)
    }
    return parsed
}

function parseTestDivisor(row: string): number {
    const regexMatch = row.match("Test: divisible by (\\d+)")!
    return parseInt(regexMatch[1])
}

function parseHoldingItems(row: string): WorryLevel[] {
    const regexMatch = row.match("Starting items: ([\\d\\s,]+)")!
    return regexMatch[1].split(", ").map((x) => parseInt(x))
}

function parseHoldingItemsAsPrimeFactors(row: string): WorryLevelPrimeFactors[] {
    return parseHoldingItems(row).map((i) => findPrimeFactors(i))
}

function parseWorryLevelOperation(row: string): WorryLevelOperation {
    const regexMatch = row.match("Operation: new = old (.) (\\w+)$")!
    const [_, op, arg] = regexMatch
    if (arg === "old")
        return [Operation.SQUARE, null]

    const argument = parseInt(arg)
    switch (op) {
        case "+": return [Operation.PLUS, argument]
        case "*": return [Operation.MULTIPLY, argument]
    }

    throw new Error(`Cannot parse worry level operation for ${row}`)
}

function parseRecipientMonkeys(rows: string[]): [number, number] {
    const regex = "If (?:true|false): throw to monkey (\\d+)"
    const parsed = rows
        .map((row) => row.match(regex)![1])
        .map((n) => parseInt(n))
    return parsed as [number, number]
}

function clone(objectToClone: any) {
    const stringified = JSON.stringify(objectToClone);
    const parsed = JSON.parse(stringified);
    return parsed;
}

function itemWithNewWorryLevel(
    item: Item,
    worryLevelOperation: WorryLevelOperation,
    worryLevelReduceDivider: number
): Item {
    const [operation, operationArg] = worryLevelOperation

    if (isWorryLevelPrimeFactors(item)) {
        const updatedItem: Item = (() => {
            switch (operation) {
                case Operation.MULTIPLY: return primeFactorsProduct(item, operationArg!)
                case Operation.PLUS: return primeFactorsSum(item, operationArg!)
                case Operation.SQUARE: return primeFactorsSquare(item)
            }
        })()
        return primeFactorsRoundedDivision(updatedItem, worryLevelReduceDivider)
    }

    const increasedWorryLevel: Item = (() => {
        switch (operation) {
            case Operation.MULTIPLY: return item * operationArg!
            case Operation.PLUS: return item + operationArg!
            case Operation.SQUARE: return item * item
        }
    })()

    return Math.floor(increasedWorryLevel / worryLevelReduceDivider)
}

function getRecipientMonkeyFor(item: Item, monkey: Monkey): number {
    let useFirstMonkeyAsRecipient = isWorryLevelPrimeFactors(item) ?
        item.includes(monkey.testDivisor) :
        (item % monkey.testDivisor) == 0

    return useFirstMonkeyAsRecipient ? monkey.recipientMonkeys[0] : monkey.recipientMonkeys[1]
}
