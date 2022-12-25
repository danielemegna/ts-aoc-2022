import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { getItemPriority, prioritiesSumOfSharedItems, prioritiesSumOfThreeElfGroupBadges } from '../../src/day3/rucksack_reorganization';

describe('first part resolution', () => {

    test('get item priority: a-z is 1-26, A-Z is 27-52', () => {
        expect(getItemPriority("a")).toBe(1)
        expect(getItemPriority("p")).toBe(16)
        expect(getItemPriority("s")).toBe(19)
        expect(getItemPriority("v")).toBe(22)
        expect(getItemPriority("z")).toBe(26)
        expect(getItemPriority("A")).toBe(27)
        expect(getItemPriority("L")).toBe(38)
        expect(getItemPriority("P")).toBe(42)
        expect(getItemPriority("Z")).toBe(52)
    })

    test('solve provided example of rucksack inventory', () => {
        const rucksacksInventory =
            "vJrwpWtwJgWr" + "hcsFMMfFFhFp\n" + // p = 16
            "jqHRNqRjqzjGDLGL" + "rsFMfFZSrLrFZsSL\n" + // L = 38
            "PmmdzqPrV" + "vPwwTWBwg\n" + // P = 42
            "wMqvLMZHhHMvwLH" + "jbvcjnnSBnvTQFn\n" + // v = 22
            "ttgJtRGJ" + "QctTZtZT\n" + // t = 20
            "CrZsJsPPZsGz" + "wwsLwLmpwMDw\n" // s = 19

        const actual = prioritiesSumOfSharedItems(rucksacksInventory)

        expect(actual).toBe(16 + 38 + 42 + 22 + 20 + 19)
    })

    test('solve from file', () => {
        const rucksacksInventory  = readFileSync('./test/day3/input.txt', 'utf-8')
        const actual = prioritiesSumOfSharedItems(rucksacksInventory)
        expect(actual).toBe(7908)
    })

})

describe('second part resolution', () => {

    test('solve provided example of rucksack inventory', () => {
        const rucksacksInventory =
            "vJrwpWtwJgWr" + "hcsFMMfFFhFp\n" + 
            "jqHRNqRjqzjGDLGL" + "rsFMfFZSrLrFZsSL\n" +
            "PmmdzqPrV" + "vPwwTWBwg\n" + // r = 18
            "wMqvLMZHhHMvwLH" + "jbvcjnnSBnvTQFn\n" +
            "ttgJtRGJ" + "QctTZtZT\n" +
            "CrZsJsPPZsGz" + "wwsLwLmpwMDw\n" // Z = 70

        const actual = prioritiesSumOfThreeElfGroupBadges(rucksacksInventory)

        expect(actual).toBe(18 + 52)
    })

    test('solve from file', () => {
        const rucksacksInventory  = readFileSync('./test/day3/input.txt', 'utf-8')
        const actual = prioritiesSumOfThreeElfGroupBadges(rucksacksInventory)
        expect(actual).toBe(2838)
    })

})