import { Direction } from "./rope_bridge"

export type Coordinate = { x: number, y: number }

export class Rope {
    private head: Coordinate
    private tail: Coordinate

    constructor(
        headCoordinate: Coordinate = { x: 0, y: 0 },
        tailCoordinate: Coordinate = { x: 0, y: 0 }
    ) {
        this.head = { ...headCoordinate }
        this.tail = { ...tailCoordinate }
    }

    headCoordinate(): Coordinate {
        return { ...this.head }
    }

    tailCoordinate(): Coordinate {
        return { ...this.tail }
    }

    headMove(direction: Direction) {
        switch (direction) {
            case Direction.RIGHT:
                this.head.x++
                break
            case Direction.UP:
                this.head.y++
                break
            case Direction.LEFT:
                this.head.x--
                break
            case Direction.DOWN:
                this.head.y--
                break
            case Direction.RIGHT_UP:
                this.head.x++
                this.head.y++
                break
            case Direction.RIGHT_DOWN:
                this.head.x++
                this.head.y--
                break
            case Direction.LEFT_UP:
                this.head.x--
                this.head.y++
                break
            case Direction.LEFT_DOWN:
                this.head.x--
                this.head.y--
                break
        }

        this.tailMove()
    }

    private tailMove() {
        const areAbscissasTooFar = Math.abs(this.head.x - this.tail.x) > 1
        const areOrdinatesTooFar = Math.abs(this.head.y - this.tail.y) > 1
        const areHeadAndTailTouching = !areAbscissasTooFar && !areOrdinatesTooFar

        if (areHeadAndTailTouching)
            return

        if(this.head.x > this.tail.x)
            this.tail.x++
        if(this.head.x < this.tail.x)
            this.tail.x--
        if(this.head.y > this.tail.y)
            this.tail.y++
        if(this.head.y < this.tail.y)
            this.tail.y--
    }
}