import { Coordinate } from "./rope";

export class Knot {
    private coordinate: Coordinate

    constructor(initialCoordinate: Coordinate) {
        this.coordinate = { ...initialCoordinate }
    }

    getCoordinate(): Coordinate {
        return { ...this.coordinate }
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