export enum Operation {
    MULTIPLY, PLUS, SQUARE
}

export type Monkey = {
    holdingItems: number[]
    worryLevelOperation: WorryLevelOperation,
    testDivisor: number,
    recipientMonkeys: [number, number]
}

type WorryLevelOperation = [Operation, number] | [Operation.SQUARE, null]

export const levelOfMonkeyBusiness = (input: string): number => {
    return -1
}

export const parseInput = (input: string): Monkey[] => {
    const rows = input.split("\n")
    const parsed: Monkey[] = []
    while (rows.length > 0) {
        const monkeyRows = rows.splice(0, 7)
        const monkey = {
            holdingItems: parseHoldingItems(monkeyRows[1]),
            worryLevelOperation: parseWorryLevelOperation(monkeyRows[2]),
            testDivisor: parseTestDivisor(monkeyRows[3]),
            recipientMonkeys: parseRecipientMonkeys(monkeyRows.slice(4, 6))
        } as Monkey
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

