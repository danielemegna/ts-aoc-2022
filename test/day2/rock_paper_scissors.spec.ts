import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs'
import { totalScoreWith, wrongStrategyInterpreter } from '../../src/day2/rock_paper_scissors';


test('total score of short strategy', () => {
    const strategyGuide =
        "A Y\n" +
        "B X\n" +
        "C Z\n"

    const totalScore = totalScoreWith(strategyGuide, wrongStrategyInterpreter)

    expect(totalScore).toBe(8 + 1 + 6)
})

test('three always draw rounds', () => {
    const strategyGuide =
        "A X\n" +
        "B Y\n" +
        "C Z\n"

    const totalScore = totalScoreWith(strategyGuide, wrongStrategyInterpreter)

    expect(totalScore).toBe(1 + 3 + 2 + 3 + 3 + 3)
})

test('three always win rounds', () => {
    const strategyGuide =
        "C X\n" +
        "A Y\n" +
        "B Z\n"

    const totalScore = totalScoreWith(strategyGuide, wrongStrategyInterpreter)

    expect(totalScore).toBe(1 + 6 + 2 + 6 + 3 + 6)
})

test('solve first part from file', () => {
    const strategyGuide = readFileSync('./test/day2/input.txt', 'utf-8')
    const totalScore = totalScoreWith(strategyGuide, wrongStrategyInterpreter)
    expect(totalScore).toBe(10624)
})