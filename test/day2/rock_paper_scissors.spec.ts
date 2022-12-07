import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs'
import { totalScoreWith } from '../../src/day2/rock_paper_scissors';


test('total score of short strategy', () => {
    const strategyGuide =
        "A Y\n" +
        "B X\n" +
        "C Z\n"

    const totalScore = totalScoreWith(strategyGuide)

    expect(totalScore).toBe(8 + 1 + 6)
})

test('solve first part from file', () => {
    const strategyGuide = readFileSync('./test/day2/input.txt', 'utf-8')
    const totalScore = totalScoreWith(strategyGuide)
    expect(totalScore).toBe(12817)
})