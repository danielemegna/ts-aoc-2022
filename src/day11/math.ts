const FIRST_PRIME_NUMBERS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

export const findPrimeFactors = (n: number): number[] => {
    const result = []
    let currentNumber = n
    let primeNumberIndex = 0

    while (currentNumber > 1) {
        const primeNumber = FIRST_PRIME_NUMBERS[primeNumberIndex];
        if (currentNumber % primeNumber !== 0) {
            primeNumberIndex++
            continue
        }

        result.push(primeNumber)
        currentNumber = currentNumber / primeNumber
    }

    return result
}