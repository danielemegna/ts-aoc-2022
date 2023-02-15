import { Coordinate, Rope } from "./rope"

export enum Direction { UP, LEFT, RIGHT, DOWN }
export type Motion = { direction: Direction, steps: number }

export const positionsVisitedByTail = (seriesOfMotionRaw: string): number => {
    const motions = parseSeriesOfMotions(seriesOfMotionRaw)
    const rope = new Rope()
    const visitedCoordinates: Coordinate[] = []
    for (const motion of motions) {
        for (let i = 0; i < motion.steps; i++) {
            rope.headMove(motion.direction)
            const visitedCoordinate = rope.tail()
            if (!visitedCoordinates.some((c) => c.x == visitedCoordinate.x && c.y == visitedCoordinate.y))
                visitedCoordinates.push(visitedCoordinate)
        }
    }
    return visitedCoordinates.length
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
