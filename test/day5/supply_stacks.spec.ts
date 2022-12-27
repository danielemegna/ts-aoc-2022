import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { CratesStack, finalTopCratesMessage, parseInput, StacksOfCrates } from '../../src/day5/supply_stacks';

describe('first part resolution', () => {
    const providedInputExample =
        "    [D]    \n" +
        "[N] [C]    \n" +
        "[Z] [M] [P]\n" +
        " 1   2   3 \n" +
        "\n" +
        "move 1 from 2 to 1\n" +
        "move 3 from 1 to 3\n" +
        "move 2 from 2 to 1\n" +
        "move 1 from 1 to 2\n"

    test('parse input starting stacks of crates', () => {
        const [startingStacksOfCrates, _rearrangementProcedure] = parseInput(providedInputExample)

        const expected = [
            ["N", "Z"] as CratesStack,
            ["D", "C", "M"] as CratesStack,
            ["P"] as CratesStack
        ] as StacksOfCrates

        expect(startingStacksOfCrates).toStrictEqual(expected)
    })

    test.skip('solve with provided example', () => {
        const actual = finalTopCratesMessage(providedInputExample)
        expect(actual).toBe("CMZ")
    })

    test.skip('solve with input from file', () => {
        const input = readFileSync('./test/day5/input.txt', 'utf-8')
        const actual = finalTopCratesMessage(input)
        expect(actual).toBe("pippo")
    })

})
