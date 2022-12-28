
export const charsToFirstStartOfPacketMarker = (input: string): number => {

    for (var i = 4; i < input.length; i++) {
        const current = input.slice(i - 4, i)
        if (new Set(current).size == 4)
            return i
    }

    throw Error("Cannot find any start-of-packet marker")
}

export const charsToFirstStartOfMessageMarker = (input: string): number => {

    for (var i = 14; i < input.length; i++) {
        const current = input.slice(i - 14, i)
        if (new Set(current).size == 14)
            return i
    }

    throw Error("Cannot find any start-of-message marker")
}