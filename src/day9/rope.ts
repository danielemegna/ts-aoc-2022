import { Coordinate, Knot } from "./knot"
import { Direction } from "./rope_bridge"

export class Rope {
    private knots: Knot[]

    constructor() {
        this.knots = [
            new Knot({ x: 0, y: 0 }),
            new Knot({ x: 0, y: 0 })
        ]
    }

    tailCoordinate(): Coordinate {
        return this.lastKnot().getCoordinate()
    }

    headMove(direction: Direction): void {
        this.head().move(direction)
        this.lastKnot().follow(this.head().getCoordinate())
    }

    private head(): Knot {
        return this.knots.at(0)!
    }

    private lastKnot(): Knot {
        return this.knots.at(-1)!
    }
}