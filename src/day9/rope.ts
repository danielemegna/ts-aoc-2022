import { Direction } from "./rope_bridge"

export type Coordinate = { x: number, y: number }

export class Rope {
    private headCoordinate: Coordinate
    private tailCoordinate: Coordinate

    constructor(
        head: Coordinate = { x: 0, y: 0 },
        tail: Coordinate = { x: 0, y: 0 }
    ) {
        this.headCoordinate = { ...head }
        this.tailCoordinate = { ...tail }
    }

    head(): Coordinate {
        return { ...this.headCoordinate }
    }

    tail(): Coordinate {
        return { ...this.tailCoordinate }
    }

    headMove(direction: Direction) {
        const oldHeadCoordinate = this.head()
        switch (direction) {
            case Direction.RIGHT:
                this.headCoordinate.x++
                break
            case Direction.UP:
                this.headCoordinate.y++
                break
            case Direction.LEFT:
                this.headCoordinate.x--
                break
            case Direction.DOWN:
                this.headCoordinate.y--
                break
        }

        this.tailMove(oldHeadCoordinate)
    }

    private tailMove(oldHeadCoordinate: Coordinate) {
        const areAbscissasTooFar = Math.abs(this.head().x - this.tail().x) > 1
        const areOrdinatesTooFar = Math.abs(this.head().y - this.tail().y) > 1
        const areHeadAndTailTouching = !areAbscissasTooFar && !areOrdinatesTooFar

        if (areHeadAndTailTouching)
            return

        this.tailCoordinate = oldHeadCoordinate
    }
}