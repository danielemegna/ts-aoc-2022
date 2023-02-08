import { expect, test } from '@jest/globals';
import { Rope } from '../../src/day9/rope';
import { Direction } from '../../src/day9/rope_bridge';

describe('rope', () => {

    test('new rope head and tail coordinates', () => {
        const rope = new Rope()
        expect(rope.head()).toStrictEqual({ x: 0, y: 0 })
        expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
    })

    test('right move with head and tail overlapping only moves head', () => {
        const rope = new Rope()

        rope.headMove(Direction.RIGHT)

        expect(rope.head()).toStrictEqual({ x: 1, y: 0 })
        expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
    })

    test('up move with head and tail overlapping only moves head', () => {
        const rope = new Rope()

        rope.headMove(Direction.UP)

        expect(rope.head()).toStrictEqual({ x: 0, y: 1 })
        expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
    })

})

