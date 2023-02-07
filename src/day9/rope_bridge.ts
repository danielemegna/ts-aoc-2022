export enum Direction { UP, LEFT, RIGHT, DOWN }
export type Motion = { direction: Direction, steps: number }

export const positionsVisitedByTail = (seriesOfMotionRaw: string): number => {
    throw new Error('Function not implemented.');
}

export const parseSeriesOfMotions = (seriesOfMotionRaw: string): Motion[] => {
    return seriesOfMotionRaw
        .split("\n")
        .filter((row) => row !== "")
        .map((row) => {
            const [directionRaw, stepsRaw] = row.split(" ")

            const direction = {
                'R': Direction.RIGHT,
                'L': Direction.LEFT,
                'U': Direction.UP,
                'D': Direction.DOWN,
            }[directionRaw]
            const steps = parseInt(stepsRaw)

            return { direction: direction, steps: steps } as Motion
        })
}
