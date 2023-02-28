const SOME_PRIME_NUMBERS = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
    179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
    283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409,
    419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541,
    547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659,
    661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809,
    811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941,
    947, 953, 967, 971, 977, 983, 991, 997, 100, 1013,
    1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069,
    1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151,
    1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223
]

export const findPrimeFactors = (n: number): number[] => {
    const result = []
    let currentNumber = n
    let primeNumberIndex = 0

    while (currentNumber > 1) {
        if (primeNumberIndex >= SOME_PRIME_NUMBERS.length)
            throw new Error(`We need more prime numbers for ${n} !`)

        const primeNumber = SOME_PRIME_NUMBERS[primeNumberIndex];
        if (currentNumber % primeNumber !== 0) {
            primeNumberIndex++
            continue
        }

        result.push(primeNumber)
        currentNumber = currentNumber / primeNumber
    }

    return result
}

export const primeFactorsProduct = (primeFactors: number[], factor: number) => {
    return primeFactors.concat(findPrimeFactors(factor))
}

export const primeFactorsSum = (primeFactors: number[], adding: number): number[] => {
    const product = primeFactors.reduce((x, product) => x * product)
    const bigNumber = product + adding
    return findPrimeFactors(bigNumber)
}

export const primeFactorsRoundedDivision = (primeFactors: number[], divisor: number): number[] => {
    const primeFactorsClone = primeFactors.slice(0);
    const divisorIndex = primeFactors.findIndex((f) => f === divisor)
    if (divisorIndex >= 0) {
        primeFactorsClone.splice(divisorIndex, 1)
        return primeFactorsClone.length > 0 ? primeFactorsClone : [1]
    }

    const product = primeFactors.reduce((x, product) => x * product)
    const bigNumber = Math.floor(product / divisor)
    return findPrimeFactors(bigNumber)
}

export const primeFactorsSquare = (primeFactors: number[]): number[] => {
    return primeFactors.concat(primeFactors)
}