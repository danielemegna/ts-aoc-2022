import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import {
    Monkey, Operation,
    levelOfMonkeyBusiness, parseInput, processRoundOfMonkeyNumber
} from '../../src/day11/monkey_in_the_middle';

const providedInputExample = [
    "Monkey 0:",
    "  Starting items: 79, 98",
    "  Operation: new = old * 19",
    "  Test: divisible by 23",
    "    If true: throw to monkey 2",
    "    If false: throw to monkey 3",
    "",
    "Monkey 1:",
    "  Starting items: 54, 65, 75, 74",
    "  Operation: new = old + 6",
    "  Test: divisible by 19",
    "    If true: throw to monkey 2",
    "    If false: throw to monkey 0",
    "",
    "Monkey 2:",
    "  Starting items: 79, 60, 97",
    "  Operation: new = old * old",
    "  Test: divisible by 13",
    "    If true: throw to monkey 1",
    "    If false: throw to monkey 3",
    "",
    "Monkey 3:",
    "  Starting items: 74",
    "  Operation: new = old + 3",
    "  Test: divisible by 17",
    "    If true: throw to monkey 0",
    "    If false: throw to monkey 1",
].join("\n") + "\n"

describe('first part resolution', () => {

    describe('input parsing', () => {

        test('with provided input example', () => {
            const actual = parseInput(providedInputExample)
            const expected: Monkey[] = [
                {
                    holdingItems: [79, 98],
                    worryLevelOperation: [Operation.MULTIPLY, 19],
                    testDivisor: 23,
                    recipientMonkeys: [2, 3],
                    inpectedItemsCount: 0
                },
                {
                    holdingItems: [54, 65, 75, 74],
                    worryLevelOperation: [Operation.PLUS, 6],
                    testDivisor: 19,
                    recipientMonkeys: [2, 0],
                    inpectedItemsCount: 0
                },
                {
                    holdingItems: [79, 60, 97],
                    worryLevelOperation: [Operation.SQUARE, null],
                    testDivisor: 13,
                    recipientMonkeys: [1, 3],
                    inpectedItemsCount: 0
                },
                {
                    holdingItems: [74],
                    worryLevelOperation: [Operation.PLUS, 3],
                    testDivisor: 17,
                    recipientMonkeys: [0, 1],
                    inpectedItemsCount: 0
                }
            ]
            expect(actual).toStrictEqual(expected)
        })

        test('with puzzle input', () => {
            const input = readFileSync('./test/day11/input.txt', 'utf-8')
            const actual = parseInput(input)
            expect(actual).toHaveLength(8)
            expect(actual[0].holdingItems).toStrictEqual([57, 58])
            expect(actual[1].worryLevelOperation).toStrictEqual([Operation.PLUS, 1])
            expect(actual[2].testDivisor).toBe(5)
            expect(actual[3].recipientMonkeys).toStrictEqual([5, 2])
        })

    })

    describe('monkey round should return new array of monkeys', () => {
        const monkeys: Monkey[] = [
            {
                holdingItems: [79, 98],
                worryLevelOperation: [Operation.MULTIPLY, 19],
                testDivisor: 23,
                recipientMonkeys: [2, 3],
                inpectedItemsCount: 0
            },
            {
                holdingItems: [54, 65, 75, 74],
                worryLevelOperation: [Operation.PLUS, 6],
                testDivisor: 19,
                recipientMonkeys: [2, 0],
                inpectedItemsCount: 0
            },
            {
                holdingItems: [79, 60, 97],
                worryLevelOperation: [Operation.SQUARE, null],
                testDivisor: 13,
                recipientMonkeys: [1, 3],
                inpectedItemsCount: 0
            },
            {
                holdingItems: [74],
                worryLevelOperation: [Operation.PLUS, 3],
                testDivisor: 17,
                recipientMonkeys: [0, 1],
                inpectedItemsCount: 0
            }
        ]

        test('monkey 0 throw items 79-98 to monkey 3 as 500-620', () => {
            const newMonkeys = processRoundOfMonkeyNumber(0, monkeys)
            expect(newMonkeys[0].holdingItems).toHaveLength(0)
            expect(newMonkeys[0].inpectedItemsCount).toBe(2)
            expect(newMonkeys[3].holdingItems).toStrictEqual([74, 500, 620])
            expect(newMonkeys[3].inpectedItemsCount).toBe(0)
        })

        test('monkey 1 throw items to monkey 0', () => {
            const newMonkeys = processRoundOfMonkeyNumber(1, monkeys)
            expect(newMonkeys[1].holdingItems).toHaveLength(0)
            expect(newMonkeys[1].inpectedItemsCount).toBe(4)
            expect(newMonkeys[0].holdingItems).toStrictEqual([79, 98, 20, 23, 27, 26])
        })

        test('monkey 2 throw items to monkey 1 and 3', () => {
            const newMonkeys = processRoundOfMonkeyNumber(2, monkeys)
            expect(newMonkeys[2].holdingItems).toHaveLength(0)
            expect(newMonkeys[2].inpectedItemsCount).toBe(3)
            expect(newMonkeys[1].holdingItems).toStrictEqual([54, 65, 75, 74, 2080])
            expect(newMonkeys[3].holdingItems).toStrictEqual([74, 1200, 3136])
        })

    })

    test('solve with provided example', () => {
        const actual = levelOfMonkeyBusiness(providedInputExample)
        expect(actual).toBe(101 * 105)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day11/input.txt', 'utf-8')
        const actual = levelOfMonkeyBusiness(input)
        expect(actual).toBe(50830)
    })

})
