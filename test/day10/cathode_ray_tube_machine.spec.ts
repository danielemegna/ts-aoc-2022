import { describe, expect, test } from '@jest/globals';
import { Instruction, InstructionType, Program } from '../../src/day10/cathode_ray_tube';
import { CathodeRayTubeMachine } from '../../src/day10/cathode_ray_tube_machine';

describe('cathode ray tube machine', () => {

    const machine = new CathodeRayTubeMachine()

    test('load simple program and get X register value', () => {
        const simpleProgram = [
            [InstructionType.NOOP, null] as Instruction,
            [InstructionType.ADDX, 3] as Instruction,
            [InstructionType.ADDX, -5] as Instruction,
        ] as Program

        machine.load(simpleProgram)

        expect(machine.getXRegisterValueDuringClock(1)).toBe(1)
        expect(machine.getXRegisterValueDuringClock(2)).toBe(1)
        expect(machine.getXRegisterValueDuringClock(3)).toBe(1)
        expect(machine.getXRegisterValueDuringClock(4)).toBe(4)
        expect(machine.getXRegisterValueDuringClock(5)).toBe(4)
        expect(machine.getXRegisterValueDuringClock(6)).toBe(-1)
        expect(machine.getXRegisterValueDuringClock(42)).toBe(-1)
    })


})
