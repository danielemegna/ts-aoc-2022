export const countOverlappingPairs = (input: string): number => {
    const rows = input
        .split("\n")
        .filter((row) => row !== "")

    const parsedPairs = rows
        .map((row) => {
            const matches = row.match(/^(\d+)-(\d+),(\d+)-(\d+)$/)!.slice(1)
            const extractedNumbers = matches.map(n => parseInt(n))
            return [
                [extractedNumbers[0], extractedNumbers[1]] as Range,
                [extractedNumbers[2], extractedNumbers[3]] as Range
            ] as RangePair
        })

    const overlappingPairs = parsedPairs.filter(areFullyOverlapping)
    return overlappingPairs.length
}

type Range = [number, number]
type RangePair = [Range, Range]

type OverlapRule = (ranges: RangePair) => boolean

const areFullyOverlapping: OverlapRule = ([[firstStart, firstEnd], [secondStart, secondEnd]]) => {
    return (firstStart >= secondStart && firstEnd <= secondEnd) ||
        (secondStart >= firstStart && secondEnd <= firstEnd)
}