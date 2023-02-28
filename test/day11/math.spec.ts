import { describe, expect, test } from '@jest/globals';
import { findPrimeFactors } from '../../src/day11/math';

describe('find prime factors', () => {

    test('of a prime number', () => {
        expect(findPrimeFactors(2)).toStrictEqual([2])
        expect(findPrimeFactors(3)).toStrictEqual([3])
        expect(findPrimeFactors(5)).toStrictEqual([5])
        expect(findPrimeFactors(17)).toStrictEqual([17])
        expect(findPrimeFactors(19)).toStrictEqual([19])
    })

    test('simple cases', () => {
        expect(findPrimeFactors(2 * 3)).toStrictEqual([2, 3])
        expect(findPrimeFactors(2 * 3 * 5)).toStrictEqual([2, 3, 5])
        expect(findPrimeFactors(2 * 3 * 7)).toStrictEqual([2, 3, 7])
        expect(findPrimeFactors(2 * 5 * 11)).toStrictEqual([2, 5, 11])
        expect(findPrimeFactors(2 * 5 * 11 * 23)).toStrictEqual([2, 5, 11, 23])
    })

    test('with some multiple factors', () => {
        expect(findPrimeFactors(2 * 2 * 3 * 5)).toStrictEqual([2, 2, 3, 5])
        expect(findPrimeFactors(2 * 2 * 3 * 5 * 5)).toStrictEqual([2, 2, 3, 5, 5])
        expect(findPrimeFactors(2 * 5 * 11 * 23 * 23)).toStrictEqual([2, 5, 11, 23, 23])
    })

})
