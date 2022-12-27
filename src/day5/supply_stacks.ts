export type CratesStack = string[]
export type StacksOfCrates = CratesStack[]
export type RearrangementProcedure = any // TODO define this type

export const parseInput = (input: string): [StacksOfCrates, RearrangementProcedure] => {
    const rows = input.split("\n")
    const emptyRowIndex = rows.indexOf("")

    const stacksOfCratesRows = rows.slice(0, emptyRowIndex - 1)
    const rearrangementProcedureRows = rows.slice(emptyRowIndex + 1)

    return [parseStacksOfCrates(stacksOfCratesRows), null]
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

const newStacksOfCrates = (size: number): StacksOfCrates =>
    [...new Array(size)].map(() => []) as StacksOfCrates

export const finalTopCratesMessage = (input: string): string => {
    return "TILT" // TODO
}
