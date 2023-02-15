import { expect, test } from '@jest/globals';
import { Rope } from '../../src/day9/rope';
import { Direction } from '../../src/day9/rope_bridge';

describe('rope', () => {

    test('new rope head and tail coordinates', () => {
        const rope = new Rope()
        expect(rope.head()).toStrictEqual({ x: 0, y: 0 })
        expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
    })

    describe('move with head and tail overlapping only moves head', () => {

        test('right', () => {
            const rope = new Rope()

            rope.headMove(Direction.RIGHT)

            expect(rope.head()).toStrictEqual({ x: 1, y: 0 })
            expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
        })

        test('up', () => {
            const rope = new Rope()

            rope.headMove(Direction.UP)

            expect(rope.head()).toStrictEqual({ x: 0, y: 1 })
            expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
        })

        test('left', () => {
            const rope = new Rope()

            rope.headMove(Direction.LEFT)

            expect(rope.head()).toStrictEqual({ x: -1, y: 0 })
            expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
        })

        test('down', () => {
            const rope = new Rope()

            rope.headMove(Direction.DOWN)

            expect(rope.head()).toStrictEqual({ x: 0, y: -1 })
            expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
        })

    })

    describe('tail should follow head on same line when not touching', () => {

        test('right move', () => {
            const head = { x: 1, y: 0 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.RIGHT)

            expect(rope.head()).toStrictEqual({ x: 2, y: 0 })
            expect(rope.tail()).toStrictEqual({ x: 1, y: 0 })
        })

        test('up move', () => {
            const head = { x: 0, y: 1 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.UP)

            expect(rope.head()).toStrictEqual({ x: 0, y: 2 })
            expect(rope.tail()).toStrictEqual({ x: 0, y: 1 })
        })

        test('left move', () => {
            const head = { x: -1, y: 0 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.LEFT)

            expect(rope.head()).toStrictEqual({ x: -2, y: 0 })
            expect(rope.tail()).toStrictEqual({ x: -1, y: 0 })
        })

        test('down move', () => {
            const head = { x: 0, y: -1 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.DOWN)

            expect(rope.head()).toStrictEqual({ x: 0, y: -2 })
            expect(rope.tail()).toStrictEqual({ x: 0, y: -1 })
        })

    })

    describe('tail should not follow head when touching diagonally', () => {

        test('moving up from right', () => {
            const head = { x: 1, y: 0 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.UP)

            expect(rope.head()).toStrictEqual({ x: 1, y: 1 })
            expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
        })

        test('moving down from right', () => {
            const head = { x: 1, y: 0 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.DOWN)

            expect(rope.head()).toStrictEqual({ x: 1, y: -1 })
            expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
        })

    })

    describe('tail should follow head diagonally when not touching and are not in the same lines', () => {

        describe('from top-right', () => {
            const head = { x: 1, y: 1 }
            const tail = { x: 0, y: 0 }
            let rope: Rope

            beforeEach(() => {
                rope = new Rope(head, tail)
            })

            test('moving up', () => {
                rope.headMove(Direction.UP)
                expect(rope.head()).toStrictEqual({ x: 1, y: 2 })
                expect(rope.tail()).toStrictEqual({ x: 1, y: 1 })
            })

            test('moving right', () => {
                rope.headMove(Direction.RIGHT)
                expect(rope.head()).toStrictEqual({ x: 2, y: 1 })
                expect(rope.tail()).toStrictEqual({ x: 1, y: 1 })
            })
        })

        describe('from bottom-right', () => {
            const head = { x: 1, y: -1 }
            const tail = { x: 0, y: 0 }
            let rope: Rope

            beforeEach(() => {
                rope = new Rope(head, tail)
            })

            test('moving down', () => {
                rope.headMove(Direction.DOWN)
                expect(rope.head()).toStrictEqual({ x: 1, y: -2 })
                expect(rope.tail()).toStrictEqual({ x: 1, y: -1 })
            })
        })

        describe('from top-left', () => {
            const head = { x: -1, y: 1 }
            const tail = { x: 0, y: 0 }
            let rope: Rope

            beforeEach(() => {
                rope = new Rope(head, tail)
            })

            test('moving left', () => {
                rope.headMove(Direction.LEFT)
                expect(rope.head()).toStrictEqual({ x: -2, y: 1 })
                expect(rope.tail()).toStrictEqual({ x: -1, y: 1 })
            })
        })
    })

    test('come back to overlapping from right', () => {
        const head = { x: 1, y: 0 }
        const tail = { x: 0, y: 0 }
        const rope = new Rope(head, tail)

        rope.headMove(Direction.LEFT)

        expect(rope.head()).toStrictEqual({ x: 0, y: 0 })
        expect(rope.tail()).toStrictEqual({ x: 0, y: 0 })
    })

})

