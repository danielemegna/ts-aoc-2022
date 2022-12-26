export const countOverlappingPairs = (input: string): number => {
    const rows = input
        .split("\n")
        .filter((row) => row !== "")

    const parsedPairs = rows
        .map((row) => {
            const matches = row.matchAll(/^(\d+)-(\d+),(\d+)-(\d+)$/g)
            return [...matches][0].slice(1, 5).map(n => parseInt(n))
        })

    const overlappingPairs = parsedPairs
        .filter(([firstStart, firstEnd, secondStart, secondEnd]) => {
            return (firstStart >= secondStart && firstEnd <= secondEnd) ||
                (secondStart >= firstStart && secondEnd <= firstEnd)
        })

    return overlappingPairs.length
}