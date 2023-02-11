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