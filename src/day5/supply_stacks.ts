export type CratesStack = string[]
export type StacksOfCrates = CratesStack[]
export type RearrangementProcedure = any // TODO define this type

export const parseInput = (input: string): [StacksOfCrates, RearrangementProcedure] => {
    const rows = input.split("\n")
    
    const emptyRowIndex = rows.indexOf("")
    const stacksOfCratesRows = rows.slice(0, emptyRowIndex-1)
    const rearrangementProcedureRows = rows.slice(emptyRowIndex+1)

    const stacksOfCrates = [] as StacksOfCrates
    stacksOfCratesRows.forEach((row) => {
        var stackIndex = 0
        var rowCursor = 1
        while (true) {
            const crateValue = row.slice(rowCursor, rowCursor + 1)

            if (!stacksOfCrates[stackIndex])
                stacksOfCrates[stackIndex] = []

            if (crateValue != " ")
                stacksOfCrates[stackIndex].push(crateValue)

            rowCursor += 4
            stackIndex++
            if (rowCursor >= row.length)
                break
        }

    })

    return [stacksOfCrates, null]
}

export const finalTopCratesMessage = (input: string): string => {
    return "TILT" // TODO
}
