import { Coordinate } from "./knot"
import { Rope } from "./rope"

export enum Direction {
    UP, LEFT, RIGHT, DOWN,
    RIGHT_UP, RIGHT_DOWN,
    LEFT_UP, LEFT_DOWN
}
export type Motion = { direction: Direction, steps: number }

export const positionsVisitedByTail = (seriesOfMotionRaw: string, knotsNumber: number = 2): number => {
    const motions = parseSeriesOfMotions(seriesOfMotionRaw)
    const rope = new Rope(knotsNumber)
    const visitedCoordinates: Coordinate[] = []
    for (const motion of motions) {
        for (let i = 0; i < motion.steps; i++) {
            rope.headMove(motion.direction)
            const visitedCoordinate = rope.tailCoordinate()
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
