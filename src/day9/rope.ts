import { Direction } from "./rope_bridge"

type Coordinate = { x: number, y: number }

export class Rope {
    private headCoordinate: Coordinate
    private tailCoordinate: Coordinate

    constructor(
        head: Coordinate = { x: 0, y: 0 }, 
        tail: Coordinate = { x: 0, y: 0 }
    ) {
        this.headCoordinate = head
        this.tailCoordinate = tail
    }

    head(): Coordinate {
        return this.headCoordinate
    }

    tail(): Coordinate {
        return this.tailCoordinate
    }

    headMove(direction: Direction) {
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

        this.tailMove()
    }

    private tailMove() {
        if(this.headCoordinate.x - this.tailCoordinate.x > 1)
            this.tailCoordinate.x++
        if(this.headCoordinate.y - this.tailCoordinate.y > 1)
            this.tailCoordinate.y++
        if(this.headCoordinate.x - this.tailCoordinate.x < -1)
            this.tailCoordinate.x--
        if(this.headCoordinate.y - this.tailCoordinate.y < -1)
            this.tailCoordinate.y--
    }
}