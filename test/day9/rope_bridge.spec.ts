import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { Direction, Motion, parseSeriesOfMotions, positionsVisitedByTail } from '../../src/day9/rope_bridge';

const providedInputExample =
    "R 4\n" +
    "U 4\n" +
    "L 3\n" +
    "D 1\n" +
    "R 4\n" +
    "D 1\n" +
    "L 5\n" +
    "R 2\n"

const providedLargerInputExample =
    "R 5\n" +
    "U 8\n" +
    "L 8\n" +
    "D 3\n" +
    "R 17\n" +
    "D 10\n" +
    "L 25\n" +
    "U 20\n"

describe('first part resolution', () => {

    test('parse input series of motions', () => {
        const actual = parseSeriesOfMotions(providedInputExample)
        const expected = [
            { direction: Direction.RIGHT, steps: 4 } as Motion,
            { direction: Direction.UP, steps: 4 } as Motion,
            { direction: Direction.LEFT, steps: 3 } as Motion,
            { direction: Direction.DOWN, steps: 1 } as Motion,
            { direction: Direction.RIGHT, steps: 4 } as Motion,
            { direction: Direction.DOWN, steps: 1 } as Motion,
            { direction: Direction.LEFT, steps: 5 } as Motion,
            { direction: Direction.RIGHT, steps: 2 } as Motion,
        ]
        expect(actual).toStrictEqual(expected)
    })

    test('solve with provided example', () => {
        const actual = positionsVisitedByTail(providedInputExample)
        expect(actual).toBe(13)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day9/input.txt', 'utf-8')
        const actual = positionsVisitedByTail(input)
        expect(actual).toBe(6037)
    })

})

describe('second part resolution', () => {
    test('parse larger input series of motions', () => {
        const actual = parseSeriesOfMotions(providedLargerInputExample)
        const expected = [
            { direction: Direction.RIGHT, steps: 5 } as Motion,
            { direction: Direction.UP, steps: 8 } as Motion,
            { direction: Direction.LEFT, steps: 8 } as Motion,
            { direction: Direction.DOWN, steps: 3 } as Motion,
            { direction: Direction.RIGHT, steps: 17 } as Motion,
            { direction: Direction.DOWN, steps: 10 } as Motion,
            { direction: Direction.LEFT, steps: 25 } as Motion,
            { direction: Direction.UP, steps: 20 } as Motion,
        ]
        expect(actual).toStrictEqual(expected)
    })

    test('solve with provided example', () => {
        const actual = positionsVisitedByTail(providedInputExample, 10)
        expect(actual).toBe(1)
    })

    test('solve with larger provided example', () => {
        const actual = positionsVisitedByTail(providedLargerInputExample, 10)
        expect(actual).toBe(36)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day9/input.txt', 'utf-8')
        const actual = positionsVisitedByTail(input, 10)
        expect(actual).toBe(2485)
    })
})