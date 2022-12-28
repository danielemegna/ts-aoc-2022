
export const charsToFirstStartOfPacketMarker = (input: string): number => {

    const acc = new Set<string>()
    for(var i = 4; i<input.length; i++) {
        const current = input.slice(i-4, i)
        if(new Set(current).size == 4)
            return i
    }
    
    throw Error("Cannot find any start-of-packet marker")
}