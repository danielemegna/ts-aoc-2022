import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { countMeasurementIncreases } from '../../src/day2021.1/sonar_sweep';

test('count measurement increases in provided example', () => {
    const providedExampleInput =
        "199\n" +
        "200\n" +
        "208\n" +
        "210\n" +
        "200\n" +
        "207\n" +
        "240\n" +
        "269\n" +
        "260\n" +
        "263\n"

    const actual = countMeasurementIncreases(providedExampleInput)

    expect(actual).toEqual(7)
})

test('solve from file', () => {
    const input = readFileSync('./test/day2021.1/input.txt', 'utf-8')
    const actual = countMeasurementIncreases(input)
    expect(actual).toBe(1393)
})
