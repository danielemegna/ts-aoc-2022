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
                { clockNumber: 0, xRegisterValue: 1 }
            ] as XRegisterValueSnapshot[]
        }

        const finalMachineState = program.reduce((machineState, instruction) => {
            const [instructionType, instructionArgument] = instruction

            if (instructionType === InstructionType.ADDX) {
                const numberToAdd = instructionArgument!
                const futureClockNumber = machineState.clockNumber + 2
                const futureXRegisterValue = machineState.xRegisterValue + numberToAdd
                const snapshot = {
                    clockNumber: futureClockNumber,
                    xRegisterValue: futureXRegisterValue
                } as XRegisterValueSnapshot
                machineState.xRegisterValueSnapshots.push(snapshot)
                machineState.xRegisterValue += numberToAdd
                machineState.clockNumber += 2
                return machineState
            }

            machineState.clockNumber++
            return machineState
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
