import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs'
import { totalScoreWith, wrongStrategyInterpreter, rightStrategyInterpreter } from '../../src/day2/rock_paper_scissors';


describe('with first part wrong strategy interpreter', () => {

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

})

describe('with second part right strategy interpreter', () => {

    test('total score of short strategy', () => {
        const strategyGuide =
            "A Y\n" +
            "B X\n" +
            "C Z\n"

        const totalScore = totalScoreWith(strategyGuide, rightStrategyInterpreter)

        expect(totalScore).toBe(1 + 3 + 1 + 0 + 1 + 6)
    })

    test('three always draw rounds', () => {
        const strategyGuide =
            "A Y\n" +
            "B Y\n" +
            "C Y\n"

        const totalScore = totalScoreWith(strategyGuide, rightStrategyInterpreter)

        expect(totalScore).toBe(1 + 3 + 2 + 3 + 3 + 3)
    })

    test('three always win rounds', () => {
        const strategyGuide =
            "A Z\n" +
            "B Z\n" +
            "C Z\n"

        const totalScore = totalScoreWith(strategyGuide, rightStrategyInterpreter)

        expect(totalScore).toBe(1 + 6 + 2 + 6 + 3 + 6)
    })

    test('solve second part from file', () => {
        const strategyGuide = readFileSync('./test/day2/input.txt', 'utf-8')
        const totalScore = totalScoreWith(strategyGuide, rightStrategyInterpreter)
        expect(totalScore).toBe(14060)
    })

})