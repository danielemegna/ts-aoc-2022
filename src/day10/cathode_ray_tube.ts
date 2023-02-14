import { CathodeRayTubeMachine } from "./cathode_ray_tube_machine"

export type Instruction = [InstructionType, number | null]
export enum InstructionType { NOOP, ADDX }
export type Program = Instruction[]

export const parseInputInstructionFeed = (input: string): Program => {
    return input
        .split("\n")
        .filter((row) => row !== "")
        .map((row) => {
            const [instruction, argument] = row.split(" ")
            switch (instruction) {
                case 'noop':
                    return [InstructionType.NOOP, null] as Instruction
                case 'addx':
                    return [InstructionType.ADDX, parseInt(argument)] as Instruction
            }

            throw new Error(`Unexpected instruction ${row}`)
        })
}

export const renderCRTScreenWith = (input: string): string => {
    const program: Program = parseInputInstructionFeed(input)
    const cathodeRayTubeMachine = new CathodeRayTubeMachine()
    cathodeRayTubeMachine.load(program)

    const CRT_ROW_LENGTH = 40
    const CRT_ROW_NUMBER = 6

    let result = ""
    for (let rowNumber = 0; rowNumber < CRT_ROW_NUMBER; rowNumber++) {
        const clockNumberOffset = CRT_ROW_LENGTH * rowNumber
        for (let rowPixelIndex = 0; rowPixelIndex < CRT_ROW_LENGTH; rowPixelIndex++) {
            const clockNumber = clockNumberOffset + rowPixelIndex + 1
            const xRegisterValue = cathodeRayTubeMachine.getXRegisterValueDuringClock(clockNumber)
            const shouldWriteLitPixel = xRegisterValue - 1 <= rowPixelIndex && rowPixelIndex <= xRegisterValue + 1
            result += shouldWriteLitPixel ? "#" : "."
        }
        result += "\n"
    }

    return result
}

export const sumOfSixInterestingSignalStrengths = (input: string): number => {
    const program: Program = parseInputInstructionFeed(input)
    const cathodeRayTubeMachine = new CathodeRayTubeMachine()
    cathodeRayTubeMachine.load(program)

    return ([20, 60, 100, 140, 180, 220] as number[])
        .map((clockNumber: number) => {
            const xRegisterValue = cathodeRayTubeMachine.getXRegisterValueDuringClock(clockNumber)
            return xRegisterValue * clockNumber
        })
        .reduce((acc, v) => acc += v)
}