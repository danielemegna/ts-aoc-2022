import { InstructionType, Program } from "./cathode_ray_tube";

type XRegisterValueSnapshot = {
    clockNumber: number,
    xRegisterValue: number
}

export class CathodeRayTubeMachine {

    private xRegisterValueSnapshots: XRegisterValueSnapshot[] | null = null

    load(program: Program): void {
        const initialState = {
            clockNumber: 1,
            xRegisterValue: 1,
            xRegisterValueSnapshots: [
                { clockNumber: 1, xRegisterValue: 1 }
            ] as XRegisterValueSnapshot[]
        }

        const finalMachineState = program.reduce((acc, instruction) => {
            const [instructionType, instructionArgument] = instruction
            if (instructionType === InstructionType.NOOP) {
                acc.clockNumber++
                return acc
            }

            if (instructionType === InstructionType.ADDX) {
                const xRegisterValueSnapshot = {
                    clockNumber: acc.clockNumber + 2,
                    xRegisterValue: acc.xRegisterValue + instructionArgument!
                } as XRegisterValueSnapshot
                acc.xRegisterValueSnapshots.push(xRegisterValueSnapshot)
                acc.xRegisterValue += instructionArgument!
                acc.clockNumber += 2
                return acc
            }

            throw new Error("Unexpected instruction " + instruction)
        }, initialState)

        this.xRegisterValueSnapshots = finalMachineState.xRegisterValueSnapshots
    }

    getXRegisterValueDuringClock(clockNumber: number): number {
        if (this.xRegisterValueSnapshots == null || this.xRegisterValueSnapshots.length == 0)
            throw new Error("Load a program before!")

        for (let i = 0; i < this.xRegisterValueSnapshots.length; i++) {
            const snapshot = this.xRegisterValueSnapshots![i]
            if (snapshot.clockNumber == clockNumber)
                return this.xRegisterValueSnapshots![i].xRegisterValue

            if (snapshot.clockNumber > clockNumber)
                return this.xRegisterValueSnapshots![i - 1].xRegisterValue
        }

        return this.xRegisterValueSnapshots.at(-1)!.xRegisterValue
    }
}
