import { Monkey, Operation, parseInput, WorryLevel, WorryLevelOperation } from "./monkey_parser"

type WorryLevelReducer = (l: WorryLevel) => WorryLevel

export const levelOfMonkeyBusiness = (
    input: string,
    numberOfRounds: number,
    isWorryLevelReducedAfterInspection: boolean
): number => {
    let monkeys = parseInput(input)
    const inspectedItemCountsForMonkey = inspectedItemCountsForMonkeyWith(monkeys, numberOfRounds, isWorryLevelReducedAfterInspection)
    const [first, second] = inspectedItemCountsForMonkey.sort((a, b) => b - a)
    return first * second
}

export const inspectedItemCountsForMonkeyWith = (
    monkeys: Monkey[],
    numberOfRounds: number,
    isWorryLevelReducedAfterInspection: boolean
): number[] => {

    const worryLevelReducers: WorryLevelReducer[] = []
    worryLevelReducers.push(monkeysTestDivisorCommonMultipleWorryLevelReducerFor(monkeys))
    if (isWorryLevelReducedAfterInspection)
        worryLevelReducers.push(divideByThreeWorryLevelReducer)

    for (let roundNumber = 0; roundNumber < numberOfRounds; roundNumber++) {
        for (let monkeyNumber = 0; monkeyNumber < monkeys.length; monkeyNumber++) {
            monkeys = processRoundOfMonkeyNumber(monkeyNumber, monkeys, worryLevelReducers)
        }
    }

    return monkeys.map((m) => m.inpectedItemsCount)
}

export const processRoundOfMonkeyNumber = (
    monkeyIndex: number,
    monkeys: Monkey[],
    worryLevelReducers: WorryLevelReducer[]
): Monkey[] => {
    const newMonkeys: Monkey[] = clone(monkeys)
    const currentMonkey = newMonkeys[monkeyIndex]

    while (currentMonkey.holdingItems.length > 0) {
        const currentItemWorryLevel = currentMonkey.holdingItems.shift()!
        const newItemWorryLevel = newWorryLevelFor(currentItemWorryLevel, currentMonkey.worryLevelOperation)
        const reducedItemWorryLevel = worryLevelReducers.reduce(
            (l: WorryLevel, reducer: WorryLevelReducer) => reducer(l),
            newItemWorryLevel
        )

        const recipientMonkey = getRecipientMonkeyFor(reducedItemWorryLevel, currentMonkey)
        newMonkeys[recipientMonkey].holdingItems.push(reducedItemWorryLevel)

        currentMonkey.inpectedItemsCount++
    }

    return newMonkeys
}

function newWorryLevelFor(
    worryLevel: WorryLevel,
    worryLevelOperation: WorryLevelOperation,
): WorryLevel {
    const [operation, operationArg] = worryLevelOperation
    switch (operation) {
        case Operation.MULTIPLY: return worryLevel * operationArg!
        case Operation.PLUS: return worryLevel + operationArg!
        case Operation.SQUARE: return worryLevel * worryLevel
    }
}

function getRecipientMonkeyFor(worryLevel: WorryLevel, monkey: Monkey): number {
    let useFirstMonkeyAsRecipient = (worryLevel % monkey.testDivisor) == 0
    return useFirstMonkeyAsRecipient ? monkey.recipientMonkeys[0] : monkey.recipientMonkeys[1]
}

function monkeysTestDivisorCommonMultipleWorryLevelReducerFor(monkeys: Monkey[]): WorryLevelReducer {
    const commonMultiple = monkeys.map((m) => m.testDivisor).reduce((a, b) => a * b)
    return (l: WorryLevel) => l % commonMultiple
}

function divideByThreeWorryLevelReducer(l: WorryLevel): WorryLevel {
    return Math.floor(l / 3)
}

function clone(objectToClone: any) {
    const stringified = JSON.stringify(objectToClone);
    const parsed = JSON.parse(stringified);
    return parsed;
}
