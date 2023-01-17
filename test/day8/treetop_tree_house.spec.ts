import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { treeMapFrom, visibleTreesCount } from '../../src/day8/treetop_tree_house';

const providedInputExample =
    "30373\n" +
    "25512\n" +
    "65332\n" +
    "33549\n" +
    "35390\n"

describe('first part resolution', () => {

    describe('TreeMap parsing', () => {
        test('parse and ask for tree heights via coordinates', () => {
            const treeMap = treeMapFrom(providedInputExample)

            expect(treeMap.getHeight([0, 0])).toBe(3)
            expect(treeMap.getHeight([0, 1])).toBe(2)
            expect(treeMap.getHeight([1, 0])).toBe(0)
            expect(treeMap.getHeight([1, 1])).toBe(5)
            expect(treeMap.getHeight([2, 2])).toBe(3)
            expect(treeMap.getHeight([4, 3])).toBe(9)
            expect(treeMap.getHeight([4, 4])).toBe(0)
        })
    })

    test('small map with 4 visible trees', () => {
        const input =
            "73\n" +
            "25\n"
        const actual = visibleTreesCount(providedInputExample)

        const expectedVisibleOnTheEdge = 4
        const expectedVisibleInTheInterior = 0
        expect(actual).toBe(expectedVisibleOnTheEdge + expectedVisibleInTheInterior)
    })

    test.skip('solve with first provided example', () => {
        const actual = visibleTreesCount(providedInputExample)

        const expectedVisibleOnTheEdge = 16
        const expectedVisibleInTheInterior = 5
        expect(actual).toBe(expectedVisibleOnTheEdge + expectedVisibleInTheInterior)
    })

    test.skip('solve with input from file', () => {
        const input = readFileSync('./test/day8/input.txt', 'utf-8')
        const actual = visibleTreesCount(input)
        expect(actual).toBe(999)
    })

})
