import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { Instruction, InstructionType, parseInputInstructionFeed, Program, sumOfSixInterestingSignalStrengths } from '../../src/day10/cathode_ray_tube';

const providedInputExample = [
    "addx 15",
    "addx -11",
    "addx 6",
    "addx -3",
    "addx 5",
    "addx -1",
    "addx -8",
    "addx 13",
    "addx 4",
    "noop",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx -35",
    "addx 1",
    "addx 24",
    "addx -19",
    "addx 1",
    "addx 16",
    "addx -11",
    "noop",
    "noop",
    "addx 21",
    "addx -15",
    "noop",
    "noop",
    "addx -3",
    "addx 9",
    "addx 1",
    "addx -3",
    "addx 8",
    "addx 1",
    "addx 5",
    "noop",
    "noop",
    "noop",
    "noop",
    "noop",
    "addx -36",
    "noop",
    "addx 1",
    "addx 7",
    "noop",
    "noop",
    "noop",
    "addx 2",
    "addx 6",
    "noop",
    "noop",
    "noop",
    "noop",
    "noop",
    "addx 1",
    "noop",
    "noop",
    "addx 7",
    "addx 1",
    "noop",
    "addx -13",
    "addx 13",
    "addx 7",
    "noop",
    "addx 1",
    "addx -33",
    "noop",
    "noop",
    "noop",
    "addx 2",
    "noop",
    "noop",
    "noop",
    "addx 8",
    "noop",
    "addx -1",
    "addx 2",
    "addx 1",
    "noop",
    "addx 17",
    "addx -9",
    "addx 1",
    "addx 1",
    "addx -3",
    "addx 11",
    "noop",
    "noop",
    "addx 1",
    "noop",
    "addx 1",
    "noop",
    "noop",
    "addx -13",
    "addx -19",
    "addx 1",
    "addx 3",
    "addx 26",
    "addx -30",
    "addx 12",
    "addx -1",
    "addx 3",
    "addx 1",
    "noop",
    "noop",
    "noop",
    "addx -9",
    "addx 18",
    "addx 1",
    "addx 2",
    "noop",
    "noop",
    "addx 9",
    "noop",
    "noop",
    "noop",
    "addx -1",
    "addx 2",
    "addx -37",
    "addx 1",
    "addx 3",
    "noop",
    "addx 15",
    "addx -21",
    "addx 22",
    "addx -6",
    "addx 1",
    "noop",
    "addx 2",
    "addx 1",
    "noop",
    "addx -10",
    "noop",
    "noop",
    "addx 20",
    "addx 1",
    "addx 2",
    "addx 2",
    "addx -6",
    "addx -11",
    "noop",
    "noop",
    "noop",
].join("\n") + "\n"

describe('first part resolution', () => {

    describe('instruction feed parsing', () => {

        test('parse a simple input instruction feed', () => {
            const simpleProgramInstructionFeed = [
                "noop",
                "addx 3",
                "addx -5"
            ].join("\n") + "\n"

            const actual = parseInputInstructionFeed(simpleProgramInstructionFeed)

            const expected = [
                [InstructionType.NOOP, null] as Instruction,
                [InstructionType.ADDX, 3] as Instruction,
                [InstructionType.ADDX, -5] as Instruction,
            ] as Program
            expect(actual).toStrictEqual(expected)
        })

        test('parse provided input instruction feed example', () => {
            const actual = parseInputInstructionFeed(providedInputExample)
            expect(actual.length).toBe(146)
            expect(actual[0]).toStrictEqual([InstructionType.ADDX, 15])
            expect(actual[1]).toStrictEqual([InstructionType.ADDX, -11])
            expect(actual[19]).toStrictEqual([InstructionType.ADDX, -35])
            expect(actual[30]).toStrictEqual([InstructionType.NOOP, null])
            expect(actual[145]).toStrictEqual([InstructionType.NOOP, null])
        })
    })

    test('solve with provided example', () => {
        const actual = sumOfSixInterestingSignalStrengths(providedInputExample)
        expect(actual).toBe(13140)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day10/input.txt', 'utf-8')
        const actual = sumOfSixInterestingSignalStrengths(input)
        expect(actual).toBe(12560)
    })

})
