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

