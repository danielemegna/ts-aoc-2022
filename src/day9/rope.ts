import { Coordinate, Knot } from "./knot"
import { Direction } from "./rope_bridge"

export class Rope {
    private knots: Knot[]

    constructor(knotsNumber: number) {
        this.knots = []
        for (let i = 0; i < knotsNumber; i++) {
            this.knots.push(new Knot({ x: 0, y: 0 }))
        }
    }

    tailCoordinate(): Coordinate {
        return this.lastKnot().getCoordinate()
    }

    headMove(direction: Direction): void {
        this.head().move(direction)
        for (let i = 1; i < this.knots.length; i++) {
            this.knots.at(i)!.follow(this.knots.at(i - 1)!.getCoordinate())
        }
    }

    private head(): Knot {
        return this.knots.at(0)!
    }

    private lastKnot(): Knot {
        return this.knots.at(-1)!
    }
}