export const charsToFirstStartOfPacketMarker = (input: string): number => {
    return charsToFirstNonRepeatedSequence(input, 4)
}

export const charsToFirstStartOfMessageMarker = (input: string): number => {
    return charsToFirstNonRepeatedSequence(input, 14)
}

const charsToFirstNonRepeatedSequence = (input: string, sequenceSize: number): number => {
    for (var i = sequenceSize; i < input.length; i++) {
        const current = input.slice(i - sequenceSize, i)
        if (new Set(current).size == sequenceSize)
            return i
    }

    throw Error("Cannot find any " + sequenceSize + "-size sequence of non repeated characters")
}
