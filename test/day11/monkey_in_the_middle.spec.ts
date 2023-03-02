import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { inspectedItemCountsForMonkeyWith, levelOfMonkeyBusiness, processRoundOfMonkeyNumber } from '../../src/day11/monkey_in_the_middle';
import { parsedMonkeysProvidedExample, providedInputExample } from './monkey_parser.spec';

describe('first part resolution', () => {

    describe('monkey round should return new array of monkeys', () => {

        test('monkey 0 throw items 79-98 to monkey 3 as 500-620', () => {
            const newMonkeys = processRoundOfMonkeyNumber(0, parsedMonkeysProvidedExample)
            expect(newMonkeys[0].holdingItems).toHaveLength(0)
            expect(newMonkeys[0].inpectedItemsCount).toBe(2)
            expect(newMonkeys[3].holdingItems).toStrictEqual([74, 500, 620])
            expect(newMonkeys[3].inpectedItemsCount).toBe(0)
        })

        test('monkey 1 throw items to monkey 0', () => {
            const newMonkeys = processRoundOfMonkeyNumber(1, parsedMonkeysProvidedExample)
            expect(newMonkeys[1].holdingItems).toHaveLength(0)
            expect(newMonkeys[1].inpectedItemsCount).toBe(4)
            expect(newMonkeys[0].holdingItems).toStrictEqual([79, 98, 20, 23, 27, 26])
        })

        test('monkey 2 throw items to monkey 1 and 3', () => {
            const newMonkeys = processRoundOfMonkeyNumber(2, parsedMonkeysProvidedExample)
            expect(newMonkeys[2].holdingItems).toHaveLength(0)
            expect(newMonkeys[2].inpectedItemsCount).toBe(3)
            expect(newMonkeys[1].holdingItems).toStrictEqual([54, 65, 75, 74, 2080])
            expect(newMonkeys[3].holdingItems).toStrictEqual([74, 1200, 3136])
        })

    })

    describe('inspected item counts for monkey', () => {

        describe('with default worry level reduction divider (3)', () => {

            test('after 1 round', () => {
                const actual = inspectedItemCountsForMonkeyWith(parsedMonkeysProvidedExample, 1)
                expect(actual).toStrictEqual([2, 4, 3, 5])
            })

            test('after 20 rounds', () => {
                const actual = inspectedItemCountsForMonkeyWith(parsedMonkeysProvidedExample, 20)
                expect(actual).toStrictEqual([101, 95, 7, 105])
            })

        })

    })

    test('solve with provided example', () => {
        const actual = levelOfMonkeyBusiness(providedInputExample, 20, 3)
        expect(actual).toBe(101 * 105)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day11/input.txt', 'utf-8')
        const actual = levelOfMonkeyBusiness(input, 20, 3)
        expect(actual).toBe(50830)
    })

})

describe('second part resolution', () => {

    describe('inspected item counts for monkey', () => {

        describe('without worry level reduction divider', () => {

            test('after 1 round', () => {
                const actual = inspectedItemCountsForMonkeyWith(parsedMonkeysProvidedExample, 1, 1)
                expect(actual).toStrictEqual([2, 4, 3, 6])
            })

            test('after 20 rounds', () => {
                const actual = inspectedItemCountsForMonkeyWith(parsedMonkeysProvidedExample, 20, 1)
                expect(actual).toStrictEqual([99, 97, 8, 103])
            })

            test('after 1000 rounds', () => {
                const actual = inspectedItemCountsForMonkeyWith(parsedMonkeysProvidedExample, 1000, 1)
                expect(actual).toStrictEqual([5204, 4792, 199, 5192])
            })

            test('after 5000 rounds', () => {
                const actual = inspectedItemCountsForMonkeyWith(parsedMonkeysProvidedExample, 5000, 1)
                expect(actual).toStrictEqual([26075, 23921, 974, 26000])
            })

            test('after 10000 rounds', () => {
                const actual = inspectedItemCountsForMonkeyWith(parsedMonkeysProvidedExample, 10000, 1)
                expect(actual).toStrictEqual([52166, 47830, 1938, 52013])
            })

        })

    })

    test('solve with provided example', () => {
        const actual = levelOfMonkeyBusiness(providedInputExample, 10000, 1)
        expect(actual).toBe(52166 * 52013)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day11/input.txt', 'utf-8')
        const actual = levelOfMonkeyBusiness(input, 10000, 1)
        expect(actual).toBe(14399640002)
    })
})
