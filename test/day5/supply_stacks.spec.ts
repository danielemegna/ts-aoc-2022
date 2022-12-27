import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { compute, finalTopCratesMessage, MoverModel, parseInput, RearrangementInstruction, RearrangementProcedure, StacksOfCrates } from '../../src/day5/supply_stacks';

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

describe('first part resolution', () => {

    describe('input parsing', () => {
        test('parse input starting stacks of crates', () => {
            const [startingStacksOfCrates, _rearrangementProcedure] = parseInput(providedInputExample)

            const expected = [
                ["N", "Z"],
                ["D", "C", "M"],
                ["P"]
            ] as StacksOfCrates
            expect(startingStacksOfCrates).toStrictEqual(expected)
        })

        test('parse input rearrangement procedure', () => {
            const [_startingStacksOfCrates, rearrangementProcedure] = parseInput(providedInputExample)

            const expected = [
                { move: 1, from: 2, to: 1 },
                { move: 3, from: 1, to: 3 },
                { move: 2, from: 2, to: 1 },
                { move: 1, from: 1, to: 2 }
            ] as RearrangementProcedure
            expect(rearrangementProcedure).toStrictEqual(expected)
        })
    })

    describe('rearrangement instruction computation', () => {
        test('compute single rearrangement instruction with single crate move', () => {
            const stacks = [
                ["N", "Z"],
                ["D", "C", "M"],
                ["P"]
            ] as StacksOfCrates
            const instruction: RearrangementInstruction = { move: 1, from: 2, to: 1 }

            const newStacks = compute(instruction, stacks)

            const expectedNewStacks = [
                ["D", "N", "Z"],
                ["C", "M"],
                ["P"]
            ] as StacksOfCrates
            expect(newStacks).toStrictEqual(expectedNewStacks)
        })

        test('compute single rearrangement instruction with multiple crate move', () => {
            const stacks = [
                ["D", "N", "Z"],
                ["C", "M"],
                ["P"]
            ] as StacksOfCrates
            const instruction: RearrangementInstruction = { move: 3, from: 1, to: 3 }

            const newStacks = compute(instruction, stacks)

            const expectedNewStacks = [
                [],
                ["C", "M"],
                ["Z", "N", "D", "P"]
            ] as StacksOfCrates
            expect(newStacks).toStrictEqual(expectedNewStacks)
        })

        test('instruction computation do not change original stacks', () => {
            const stacks = [
                ["N", "Z"],
                ["D", "C", "M"],
                ["P"]
            ] as StacksOfCrates
            const instruction: RearrangementInstruction = { move: 1, from: 2, to: 1 }

            compute(instruction, stacks)

            const expectedUntouchedStacks = [
                ["N", "Z"],
                ["D", "C", "M"],
                ["P"]
            ] as StacksOfCrates
            expect(stacks).toStrictEqual(expectedUntouchedStacks)
        })

    })

    test('solve with provided example', () => {
        const actual = finalTopCratesMessage(providedInputExample)
        expect(actual).toBe("CMZ")
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day5/input.txt', 'utf-8')
        const actual = finalTopCratesMessage(input)
        expect(actual).toBe("TQRFCBSJJ")
    })

})

describe('second part resolution', () => {

    test('solve with provided example', () => {
        const actual = finalTopCratesMessage(providedInputExample, MoverModel.CrateMover9001)
        expect(actual).toBe("MCD")
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day5/input.txt', 'utf-8')
        const actual = finalTopCratesMessage(input, MoverModel.CrateMover9001)
        expect(actual).toBe("RMHFJNVFP")
    })

})