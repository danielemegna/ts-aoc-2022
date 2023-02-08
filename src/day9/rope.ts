import { Direction } from "./rope_bridge"

type Coordinate = { x: number, y: number }

export class Rope {
    private headCoordinate: Coordinate = { x: 0, y: 0 }
    private tailCoordinate: Coordinate = { x: 0, y: 0 }

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
        }
    }
}