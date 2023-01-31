import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { highestScenicScoreFor, TreeMap, treeMapFrom, visibleTreesCount } from '../../src/day8/treetop_tree_house';

const providedInputExample =
    "30373\n" +
    "25512\n" +
    "65332\n" +
    "33549\n" +
    "35390\n"

const aTreeMap = new TreeMap([
    [3, 0, 3, 7, 3],
    [6, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 2, 3, 9, 0]
])


describe('first part resolution', () => {

    describe('TreeMap', () => {

        describe('parsing', () => {
            test('parse and ask for tree heights via coordinates', () => {
                const treeMap = treeMapFrom(providedInputExample)

                expect(treeMap.getTreeHeight([0, 0])).toBe(3)
                expect(treeMap.getTreeHeight([0, 1])).toBe(2)
                expect(treeMap.getTreeHeight([1, 0])).toBe(0)
                expect(treeMap.getTreeHeight([1, 1])).toBe(5)
                expect(treeMap.getTreeHeight([2, 2])).toBe(3)
                expect(treeMap.getTreeHeight([4, 3])).toBe(9)
                expect(treeMap.getTreeHeight([4, 4])).toBe(0)
            })
        })

        describe('check visible tree from coordinate', () => {
            test('trees on the edge are always visible', () => {
                expect(aTreeMap.isVisible([0, 0])).toBe(true)
                expect(aTreeMap.isVisible([0, 1])).toBe(true)
                expect(aTreeMap.isVisible([2, 0])).toBe(true)
                expect(aTreeMap.isVisible([4, 3])).toBe(true)
                expect(aTreeMap.isVisible([2, 4])).toBe(true)
                expect(aTreeMap.isVisible([4, 4])).toBe(true)
            })
            test('not visible lowest tree in the interior', () => {
                expect(aTreeMap.isVisible([3, 1])).toBe(false)
            })
            test('tree with the same high covers', () => {
                expect(aTreeMap.isVisible([2, 2])).toBe(false)
            })

            test('visible interior tree from the right', () => {
                expect(aTreeMap.isVisible([3, 2])).toBe(true)
            })

            test('visible interior tree from the left', () => {
                expect(aTreeMap.isVisible([2, 3])).toBe(true)
            })

            test('visible interior tree from the top', () => {
                expect(aTreeMap.isVisible([1, 1])).toBe(true)
            })

            test('visible interior tree from the bottom', () => {
                expect(aTreeMap.isVisible([1, 3])).toBe(true)
            })
        })

        describe('count visible trees', () => {
            test('for a 5 x 5 tree map', () => {
                const expectedVisibleOnTheEdge = 16
                const expectedVisibleInTheInterior = 6
                expect(aTreeMap.getVisibleTreesCount()).toEqual(expectedVisibleOnTheEdge + expectedVisibleInTheInterior)
            })
        })

    })

    test('small map with 4 visible trees', () => {
        const input =
            "73\n" +
            "25\n"
        const actual = visibleTreesCount(input)

        const expectedVisibleOnTheEdge = 4
        const expectedVisibleInTheInterior = 0
        expect(actual).toBe(expectedVisibleOnTheEdge + expectedVisibleInTheInterior)
    })

    test('solve with provided example', () => {
        const actual = visibleTreesCount(providedInputExample)

        const expectedVisibleOnTheEdge = 16
        const expectedVisibleInTheInterior = 5
        expect(actual).toBe(expectedVisibleOnTheEdge + expectedVisibleInTheInterior)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day8/input.txt', 'utf-8')
        const actual = visibleTreesCount(input)
        expect(actual).toBe(1533)
    })

})

describe('second part resolution', () => {

    describe('TreeMap', () => {
        test('calculate scenic score from coordinates', () => {
            expect(aTreeMap.getScenicScore([2, 1])).toBe(1 * 1 * 2 * 2)
            expect(aTreeMap.getScenicScore([2, 3])).toBe(2 * 2 * 1 * 2)
        })
    })

    test.skip('solve with provided example', () => {
        const actual = highestScenicScoreFor(providedInputExample)
        expect(actual).toBe(2 * 2 * 1 * 2)
    })

    test.skip('solve with input from file', () => {
        const input = readFileSync('./test/day8/input.txt', 'utf-8')
        const actual = highestScenicScoreFor(input)
        expect(actual).toBe(999)
    })

})
