export type CratesStack = string[]
export type StacksOfCrates = CratesStack[]
export type RearrangementProcedure = RearrangementInstruction[]
export type RearrangementInstruction = { move: number, from: number, to: number }

export const finalTopCratesMessage = (input: string): string => {
    const [startingStacksOfCrates, rearrangementProcedure] = parseInput(input)
    return "TILT" // TODO
}

export const compute = (instruction: RearrangementInstruction, stacks: StacksOfCrates) => {
    const fromStackIndex = instruction.from - 1
    const toStackIndex = instruction.to - 1
    const fromStack = stacks[fromStackIndex]
    const toStack = stacks[toStackIndex]

    const [toBeMoved, rest] = [fromStack.slice(0, 1), fromStack.slice(1)] // TODO take n elements reversed
    const newStacksOfCrates = clone(stacks)
    newStacksOfCrates[toStackIndex] = toBeMoved.concat(toStack)
    newStacksOfCrates[fromStackIndex] = rest
    return newStacksOfCrates
}

export const parseInput = (input: string): [StacksOfCrates, RearrangementProcedure] => {
    const rows = input.split("\n")
    const emptyRowIndex = rows.indexOf("")

    const stacksOfCratesRows = rows.slice(0, emptyRowIndex - 1)
    const rearrangementProcedureRows = rows.slice(emptyRowIndex + 1, rows.length - 1)

    return [
        parseStacksOfCrates(stacksOfCratesRows),
        parseRearrangementProcedure(rearrangementProcedureRows)
    ]
}

const parseStacksOfCrates = (stacksOfCratesRows: string[]): StacksOfCrates => {
    const numberOfStacks = (stacksOfCratesRows[0].length + 1) / 4
    const stacksOfCrates = newStacksOfCrates(numberOfStacks)

    stacksOfCratesRows.forEach((row) => {
        for (var stackIndex = 0; stackIndex < numberOfStacks; stackIndex++) {
            const crateValue = row[(stackIndex * 4) + 1]

            if (crateValue != " ")
                stacksOfCrates[stackIndex].push(crateValue)

        }

    })

    return stacksOfCrates
}

const parseRearrangementProcedure = (rearrangementProcedureRows: string[]): RearrangementProcedure => {
    return rearrangementProcedureRows.map((row) => {
        const matches = row.match(/^move (\d+) from (\d+) to (\d+)$/)!.slice(1).map((n) => parseInt(n))
        return { move: matches[0], from: matches[1], to: matches[2] }
    })
}

const newStacksOfCrates = (size: number): StacksOfCrates =>
    [...new Array(size)].map(() => []) as StacksOfCrates

const clone = (obj: any): any => {
    return JSON.parse(JSON.stringify(obj))
}