import { describe, expect, test } from '@jest/globals';
import { findPrimeFactors, primeFactorsRoundedDivision, primeFactorsProduct, primeFactorsSum } from '../../src/day11/math';

describe('find prime factors', () => {

    test('of a prime number', () => {
        expect(findPrimeFactors(2)).toStrictEqual([2])
        expect(findPrimeFactors(3)).toStrictEqual([3])
        expect(findPrimeFactors(5)).toStrictEqual([5])
        expect(findPrimeFactors(17)).toStrictEqual([17])
        expect(findPrimeFactors(19)).toStrictEqual([19])
        expect(findPrimeFactors(61)).toStrictEqual([61])
    })

    test('simple cases', () => {
        expect(findPrimeFactors(2 * 3)).toStrictEqual([2, 3])
        expect(findPrimeFactors(2 * 3 * 5)).toStrictEqual([2, 3, 5])
        expect(findPrimeFactors(2 * 3 * 7)).toStrictEqual([2, 3, 7])
        expect(findPrimeFactors(2 * 5 * 11)).toStrictEqual([2, 5, 11])
        expect(findPrimeFactors(2 * 5 * 11 * 23)).toStrictEqual([2, 5, 11, 23])
    })

    test('some big numbers', () => {
        expect(findPrimeFactors(1267)).toStrictEqual([7, 181])
        expect(findPrimeFactors(1501)).toStrictEqual([19, 79])
        expect(findPrimeFactors(1213 * 571)).toStrictEqual([571, 1213])
    })

    test('with some multiple factors', () => {
        expect(findPrimeFactors(2 * 2 * 3 * 5)).toStrictEqual([2, 2, 3, 5])
        expect(findPrimeFactors(2 * 2 * 3 * 5 * 5)).toStrictEqual([2, 2, 3, 5, 5])
        expect(findPrimeFactors(2 * 5 * 11 * 23 * 23)).toStrictEqual([2, 5, 11, 23, 23])
        expect(findPrimeFactors(3 * 3 * 7)).toStrictEqual([3, 3, 7])
    })

})

describe('prime factors operations', () => {
    function sort(numbers: number[]) {
        return numbers.sort((a: number, b: number) => a - b)
    }

    test('prime factors product', () => {
        expect(sort(primeFactorsProduct([2, 5], 7))).toStrictEqual([2, 5, 7])
        expect(sort(primeFactorsProduct([2, 5], 8))).toStrictEqual([2, 2, 2, 2, 5])
        expect(sort(primeFactorsProduct([2, 7], 19))).toStrictEqual([2, 7, 19])
    })

    test('prime factors sum', () => {
        expect(sort(primeFactorsSum([2], 2))).toStrictEqual([2, 2])
        expect(sort(primeFactorsSum([2, 3], 11))).toStrictEqual([17])
        expect(sort(primeFactorsSum([2, 5], 11))).toStrictEqual([3, 7])
        expect(sort(primeFactorsSum([97], 7))).toStrictEqual([2, 2, 2, 13])
    })

    test('prime factors division when prime multiple just remove the factor', () => {
        expect(sort(primeFactorsRoundedDivision([2, 3, 7, 19], 7))).toStrictEqual([2, 3, 19])
        expect(sort(primeFactorsRoundedDivision([2, 3, 3, 17, 29], 3))).toStrictEqual([2, 3, 17, 29])
    })

    test('prime factors division when multiple', () => {
        expect(sort(primeFactorsRoundedDivision([2], 2))).toStrictEqual([1])
    })

    test('prime factors division when not multiple goes to floor', () => {
        expect(sort(primeFactorsRoundedDivision([1501], 3))).toStrictEqual([2, 2, 5, 5, 5])
        expect(sort(primeFactorsRoundedDivision([1862], 3))).toStrictEqual([2, 2, 5, 31])
        expect(sort(primeFactorsRoundedDivision([2, 17, 29], 3))).toStrictEqual([2, 2, 2, 41])
        expect(sort(primeFactorsRoundedDivision([2, 3, 3, 17, 29], 7))).toStrictEqual([7, 181])
    })
})