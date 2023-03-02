import { Monkey, Operation, parseInput, WorryLevel, WorryLevelOperation } from "./monkey_parser"

const DEFAULT_WORRY_LEVEL_REDUCTION_DIVIDER = 3

export const levelOfMonkeyBusiness = (
    input: string,
    numberOfRounds: number,
    worryLevelReduceDivider: number = DEFAULT_WORRY_LEVEL_REDUCTION_DIVIDER
): number => {
    let monkeys = parseInput(input)
    const inspectedItemCountsForMonkey = inspectedItemCountsForMonkeyWith(monkeys, numberOfRounds, worryLevelReduceDivider)
    const [first, second] = inspectedItemCountsForMonkey.sort((a, b) => b - a)
    return first * second
}

export const inspectedItemCountsForMonkeyWith = (
    monkeys: Monkey[],
    numberOfRounds: number,
    worryLevelReduceDivider: number = DEFAULT_WORRY_LEVEL_REDUCTION_DIVIDER
): number[] => {
    const monkeysTestDivisorCommonMultiple = monkeys.map((m) => m.testDivisor).reduce((a, b) => a * b)
    for (let roundNumber = 0; roundNumber < numberOfRounds; roundNumber++) {
        for (let monkeyNumber = 0; monkeyNumber < monkeys.length; monkeyNumber++) {
            monkeys = processRoundOfMonkeyNumber(monkeyNumber, monkeys, worryLevelReduceDivider, monkeysTestDivisorCommonMultiple)
        }
    }

    return monkeys.map((m) => m.inpectedItemsCount)
}

export const processRoundOfMonkeyNumber = (
    monkeyIndex: number,
    monkeys: Monkey[],
    worryLevelReduceDivider: number = DEFAULT_WORRY_LEVEL_REDUCTION_DIVIDER,
    monkeysTestDivisorCommonMultiple: number | undefined = undefined
): Monkey[] => {
    const newMonkeys: Monkey[] = clone(monkeys)
    const currentMonkey = newMonkeys[monkeyIndex]

    while (currentMonkey.holdingItems.length > 0) {
        const currentItemWorryLevel = currentMonkey.holdingItems.shift()!
        const updatedItemWorryLevel = newWorryLevelFor(
            currentItemWorryLevel,
            currentMonkey.worryLevelOperation,
            worryLevelReduceDivider,
            monkeysTestDivisorCommonMultiple
        )
        const recipientMonkey = getRecipientMonkeyFor(updatedItemWorryLevel, currentMonkey)

        newMonkeys[recipientMonkey].holdingItems.push(updatedItemWorryLevel)
        currentMonkey.inpectedItemsCount++
    }

    return newMonkeys
}

function clone(objectToClone: any) {
    const stringified = JSON.stringify(objectToClone);
    const parsed = JSON.parse(stringified);
    return parsed;
}

function newWorryLevelFor(
    worryLevel: WorryLevel,
    worryLevelOperation: WorryLevelOperation,
    worryLevelReduceDivider: number,
    monkeysTestDivisorCommonMultiple: number | undefined
): WorryLevel {
    const [operation, operationArg] = worryLevelOperation

    const increasedWorryLevel: WorryLevel = (() => {
        switch (operation) {
            case Operation.MULTIPLY: return worryLevel * operationArg!
            case Operation.PLUS: return worryLevel + operationArg!
            case Operation.SQUARE: return worryLevel * worryLevel
        }
    })()

    const newWorryLevel = Math.floor(increasedWorryLevel / worryLevelReduceDivider)
    if (!monkeysTestDivisorCommonMultiple)
        return newWorryLevel

    return newWorryLevel % monkeysTestDivisorCommonMultiple
}

function getRecipientMonkeyFor(worryLevel: WorryLevel, monkey: Monkey): number {
    let useFirstMonkeyAsRecipient = (worryLevel % monkey.testDivisor) == 0
    return useFirstMonkeyAsRecipient ? monkey.recipientMonkeys[0] : monkey.recipientMonkeys[1]
}
