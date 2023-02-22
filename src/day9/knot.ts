import { Direction } from "./rope_bridge";

export type Coordinate = { x: number, y: number }

export class Knot {
    private coordinate: Coordinate

    constructor(initialCoordinate: Coordinate = { x: 0, y: 0 }) {
        this.coordinate = { ...initialCoordinate }
    }

    getCoordinate(): Coordinate {
        return { ...this.coordinate }
    }

    move(direction: Direction) {
        switch (direction) {
            case Direction.RIGHT:
                this.coordinate.x++
                break
            case Direction.UP:
                this.coordinate.y++
                break
            case Direction.LEFT:
                this.coordinate.x--
                break
            case Direction.DOWN:
                this.coordinate.y--
                break
        }

    }

    follow(coordinateToFollow: Coordinate) {
        const currentKnot = this.coordinate
        const nextKnot = coordinateToFollow

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