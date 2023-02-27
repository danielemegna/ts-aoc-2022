export enum Operation { MULTIPLY, PLUS, SQUARE }

export type Monkey = {
    holdingItems: number[]
    worryLevelOperation: WorryLevelOperation,
    testDivisor: number,
    recipientMonkeys: [number, number],
    inpectedItemsCount: number
}

type WorryLevelOperation = [Operation, number] | [Operation.SQUARE, null]

export const levelOfMonkeyBusiness = (input: string): number => {
    return -1
}

export const processRoundOfMonkeyNumber = (monkeyIndex: number, monkeys: Monkey[]): Monkey[] => {
    const newMonkeys: Monkey[] = clone(monkeys)
    const currentMonkey = newMonkeys[monkeyIndex]

    while (currentMonkey.holdingItems.length > 0) {
        const currentItem = currentMonkey.holdingItems.shift()!
        const [operation, operationArgs] = currentMonkey.worryLevelOperation

        const increasedWorryLevel = (operation == Operation.MULTIPLY) ?
            currentItem * operationArgs! : -1

        const newWorryLevel = Math.floor(increasedWorryLevel / 3)

        const recipientMonkey = (newWorryLevel % currentMonkey.testDivisor) == 0 ?
            currentMonkey.recipientMonkeys[0] :
            currentMonkey.recipientMonkeys[1]

        newMonkeys[recipientMonkey].holdingItems.push(newWorryLevel)
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

function parseHoldingItems(row: string): number[] {
    const regexMatch = row.match("Starting items: ([\\d\\s,]+)")!
    return regexMatch[1].split(", ").map((x) => parseInt(x))
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
