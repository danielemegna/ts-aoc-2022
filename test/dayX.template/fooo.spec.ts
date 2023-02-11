import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';

const providedInputExample = [].join("\n") + "\n"

describe('first part resolution', () => {

    test.skip('solve with provided example', () => {
        const actual = fooo(providedInputExample)
        expect(actual).toBe(99)
    })

    test.skip('solve with input from file', () => {
        const input = readFileSync('./test/dayX/input.txt', 'utf-8')
        const actual = fooo(input)
        expect(actual).toBe(9999)
    })

})

const fooo = (input: string): number => {
    const fooo = input
        .split("\n")
        .filter((row) => row !== "")
    return -1
}
