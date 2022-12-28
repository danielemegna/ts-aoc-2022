import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { charsToFirstStartOfPacketMarker } from '../../src/day6/tuning_trouble';


describe('first part resolution', () => {

    test('solve with first provided example', () => {
        const providedInputExample = "mjqjpqmgbljsphdztnvjfqwrcgsmlb\n"
        const actual = charsToFirstStartOfPacketMarker(providedInputExample)
        expect(actual).toBe(7)
    })

    test('other provided examples', () => {
        expect(charsToFirstStartOfPacketMarker("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5)
        expect(charsToFirstStartOfPacketMarker("nppdvjthqldpwncqszvftbrmjlhg")).toBe(6)
        expect(charsToFirstStartOfPacketMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10)
        expect(charsToFirstStartOfPacketMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11)
    })

    test('solve with input from file', () => {
        const input = readFileSync('./test/day6/input.txt', 'utf-8')
        const actual = charsToFirstStartOfPacketMarker(input)
        expect(actual).toBe(1623)
    })

})