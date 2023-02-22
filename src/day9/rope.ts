import { Direction } from "./rope_bridge"

export type Coordinate = { x: number, y: number }

export class Rope {
    private knots: Coordinate[]

    constructor(
        headCoordinate: Coordinate = { x: 0, y: 0 },
        tailCoordinate: Coordinate = { x: 0, y: 0 }
    ) {
        this.knots = [
            {...headCoordinate},
            {...tailCoordinate}
        ]
    }

    headCoordinate(): Coordinate {
        return {...this.head()}
    }

    tailCoordinate(): Coordinate {
        return {...this.knots.at(-1)!}
    }

    private head(): Coordinate {
        return this.knots.at(0)!
    }

    headMove(direction: Direction) {
        switch (direction) {
            case Direction.RIGHT:
                this.head().x++
                break
            case Direction.UP:
                this.head().y++
                break
            case Direction.LEFT:
                this.head().x--
                break
            case Direction.DOWN:
                this.head().y--
                break
            case Direction.RIGHT_UP:
                this.head().x++
                this.head().y++
                break
            case Direction.RIGHT_DOWN:
                this.head().x++
                this.head().y--
                break
            case Direction.LEFT_UP:
                this.head().x--
                this.head().y++
                break
            case Direction.LEFT_DOWN:
                this.head().x--
                this.head().y--
                break
        }

        this.moveKnotsFollowingHead()
    }

    private moveKnotsFollowingHead() {
        const currentKnotIndex = 1 // todo: this will be a recursive index for entire knots array
        const currentKnot = this.knots.at(currentKnotIndex)!
        const nextKnot = this.knots.at(currentKnotIndex-1)!

        const areAbscissasTooFar = Math.abs(nextKnot.x - currentKnot.x) > 1
        const areOrdinatesTooFar = Math.abs(nextKnot.y - currentKnot.y) > 1
        const areKnotsTouching = !areAbscissasTooFar && !areOrdinatesTooFar

        if (areKnotsTouching)
            return

        if (nextKnot.x > currentKnot.x)
            currentKnot.x++
        if (nextKnot.x < currentKnot.x)
            currentKnot.x--
        if (nextKnot.y > currentKnot.y)
            currentKnot.y++
        if (nextKnot.y < currentKnot.y)
            currentKnot.y--
    }
}