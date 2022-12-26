import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { countOverlappingPairs } from '../../src/day4/camp_cleanup';

describe('first part resolution', () => {

    test('solve with provided example', () => {
        const input =
            "2-4,6-8\n" +
            "2-3,4-5\n" +
            "5-7,7-9\n" +
            "2-8,3-7\n" +
            "6-6,4-6\n" +
            "2-6,4-8\n"

        const actual = countOverlappingPairs(input)

        expect(actual).toBe(2)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day4/input.txt', 'utf-8')
        const actual = countOverlappingPairs(input)
        expect(actual).toBe(513)
    })

})

describe('second part resolution', () => {

    test('solve with provided example', () => {
        const input =
            "2-4,6-8\n" +
            "2-3,4-5\n" +
            "5-7,7-9\n" +
            "2-8,3-7\n" +
            "6-6,4-6\n" +
            "2-6,4-8\n"

        const actual = countOverlappingPairs(input, true)

        expect(actual).toBe(4)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day4/input.txt', 'utf-8')
        const actual = countOverlappingPairs(input, true)
        expect(actual).toBe(878)
    })

})