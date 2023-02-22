import { expect, test } from '@jest/globals';
import { Rope } from '../../src/day9/rope';
import { Direction } from '../../src/day9/rope_bridge';

describe('rope', () => {

    test('new rope head and tail coordinates', () => {
        const rope = new Rope()
        expect(rope.headCoordinate()).toStrictEqual({ x: 0, y: 0 })
        expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
    })

    describe('move with head and tail overlapping only moves head', () => {

        test('right', () => {
            const rope = new Rope()

            rope.headMove(Direction.RIGHT)

            expect(rope.headCoordinate()).toStrictEqual({ x: 1, y: 0 })
            expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
        })

        test('up', () => {
            const rope = new Rope()

            rope.headMove(Direction.UP)

            expect(rope.headCoordinate()).toStrictEqual({ x: 0, y: 1 })
            expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
        })

        test('left', () => {
            const rope = new Rope()

            rope.headMove(Direction.LEFT)

            expect(rope.headCoordinate()).toStrictEqual({ x: -1, y: 0 })
            expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
        })

        test('down', () => {
            const rope = new Rope()

            rope.headMove(Direction.DOWN)

            expect(rope.headCoordinate()).toStrictEqual({ x: 0, y: -1 })
            expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
        })

    })

    describe('tail should follow head on same line when not touching', () => {

        test('right move', () => {
            const head = { x: 1, y: 0 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.RIGHT)

            expect(rope.headCoordinate()).toStrictEqual({ x: 2, y: 0 })
            expect(rope.tailCoordinate()).toStrictEqual({ x: 1, y: 0 })
        })

        test('up move', () => {
            const head = { x: 0, y: 1 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.UP)

            expect(rope.headCoordinate()).toStrictEqual({ x: 0, y: 2 })
            expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 1 })
        })

        test('left move', () => {
            const head = { x: -1, y: 0 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.LEFT)

            expect(rope.headCoordinate()).toStrictEqual({ x: -2, y: 0 })
            expect(rope.tailCoordinate()).toStrictEqual({ x: -1, y: 0 })
        })

        test('down move', () => {
            const head = { x: 0, y: -1 }
            const tail = { x: 0, y: 0 }
            const rope = new Rope(head, tail)

            rope.headMove(Direction.DOWN)

            expect(rope.headCoordinate()).toStrictEqual({ x: 0, y: -2 })
            expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: -1 })
        })

    })

    describe('tail should not follow head when', () => {

        describe('touching diagonally', () => {

            test('moving up from right', () => {
                const head = { x: 1, y: 0 }
                const tail = { x: 0, y: 0 }
                const rope = new Rope(head, tail)

                rope.headMove(Direction.UP)

                expect(rope.headCoordinate()).toStrictEqual({ x: 1, y: 1 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
            })

            test('moving down from right', () => {
                const head = { x: 1, y: 0 }
                const tail = { x: 0, y: 0 }
                const rope = new Rope(head, tail)

                rope.headMove(Direction.DOWN)

                expect(rope.headCoordinate()).toStrictEqual({ x: 1, y: -1 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
            })
        })

        describe('touching on same line', () => {

            test('moving left from top-right', () => {
                const head = { x: 1, y: 1 }
                const tail = { x: 0, y: 0 }
                const rope = new Rope(head, tail)

                rope.headMove(Direction.LEFT)

                expect(rope.headCoordinate()).toStrictEqual({ x: 0, y: 1 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
            })

            test('moving up from bottom-right', () => {
                const head = { x: 1, y: -1 }
                const tail = { x: 0, y: 0 }
                const rope = new Rope(head, tail)

                rope.headMove(Direction.UP)

                expect(rope.headCoordinate()).toStrictEqual({ x: 1, y: 0 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
            })
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
                expect(rope.headCoordinate()).toStrictEqual({ x: 1, y: 2 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: 1, y: 1 })
            })

            test('moving right', () => {
                rope.headMove(Direction.RIGHT)
                expect(rope.headCoordinate()).toStrictEqual({ x: 2, y: 1 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: 1, y: 1 })
            })

            test('moving right-up', () => {
                rope.headMove(Direction.RIGHT_UP)
                expect(rope.headCoordinate()).toStrictEqual({ x: 2, y: 2 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: 1, y: 1 })
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
                expect(rope.headCoordinate()).toStrictEqual({ x: 1, y: -2 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: 1, y: -1 })
            })

            test('moving right', () => {
                rope.headMove(Direction.RIGHT)
                expect(rope.headCoordinate()).toStrictEqual({ x: 2, y: -1 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: 1, y: -1 })
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
                expect(rope.headCoordinate()).toStrictEqual({ x: -2, y: 1 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: -1, y: 1 })
            })

            test('moving up', () => {
                rope.headMove(Direction.UP)
                expect(rope.headCoordinate()).toStrictEqual({ x: -1, y: 2 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: -1, y: 1 })
            })
        })

        describe('from bottom-left', () => {
            const head = { x: -1, y: -1 }
            const tail = { x: 0, y: 0 }
            let rope: Rope

            beforeEach(() => {
                rope = new Rope(head, tail)
            })

            test('moving left', () => {
                rope.headMove(Direction.LEFT)
                expect(rope.headCoordinate()).toStrictEqual({ x: -2, y: -1 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: -1, y: -1 })
            })

            test('moving down', () => {
                rope.headMove(Direction.DOWN)
                expect(rope.headCoordinate()).toStrictEqual({ x: -1, y: -2 })
                expect(rope.tailCoordinate()).toStrictEqual({ x: -1, y: -1 })
            })
        })

        describe('digonal moves on same line', () => {

            describe('with head on the right', () => {
                const head = { x: 1, y: 0 }
                const tail = { x: 0, y: 0 }
                let rope: Rope

                beforeEach(() => {
                    rope = new Rope(head, tail)
                })

                test('moving right-up', () => {
                    rope.headMove(Direction.RIGHT_UP)
                    expect(rope.headCoordinate()).toStrictEqual({ x: 2, y: 1 })
                    expect(rope.tailCoordinate()).toStrictEqual({ x: 1, y: 1 })
                })

                test('moving right-down', () => {
                    rope.headMove(Direction.RIGHT_DOWN)
                    expect(rope.headCoordinate()).toStrictEqual({ x: 2, y: -1 })
                    expect(rope.tailCoordinate()).toStrictEqual({ x: 1, y: -1 })
                })

                test('moving left-up', () => {
                    rope.headMove(Direction.LEFT_UP)
                    expect(rope.headCoordinate()).toStrictEqual({ x: 0, y: 1 })
                    expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
                })
            })

            describe('with head on the left', () => {
                const head = { x: -1, y: 0 }
                const tail = { x: 0, y: 0 }
                let rope: Rope

                beforeEach(() => {
                    rope = new Rope(head, tail)
                })

                test('moving left-up', () => {
                    rope.headMove(Direction.LEFT_UP)
                    expect(rope.headCoordinate()).toStrictEqual({ x: -2, y: 1 })
                    expect(rope.tailCoordinate()).toStrictEqual({ x: -1, y: 1 })
                })

                test('moving left-down', () => {
                    rope.headMove(Direction.LEFT_DOWN)
                    expect(rope.headCoordinate()).toStrictEqual({ x: -2, y: -1 })
                    expect(rope.tailCoordinate()).toStrictEqual({ x: -1, y: -1 })
                })
            })

            describe('with head on top', () => {
                const head = { x: 0, y: 1 }
                const tail = { x: 0, y: 0 }
                let rope: Rope

                beforeEach(() => {
                    rope = new Rope(head, tail)
                })

                test('moving right-up', () => {
                    rope.headMove(Direction.RIGHT_UP)
                    expect(rope.headCoordinate()).toStrictEqual({ x: 1, y: 2 })
                    expect(rope.tailCoordinate()).toStrictEqual({ x: 1, y: 1 })
                })

                test('moving left-up', () => {
                    rope.headMove(Direction.LEFT_UP)
                    expect(rope.headCoordinate()).toStrictEqual({ x: -1, y: 2 })
                    expect(rope.tailCoordinate()).toStrictEqual({ x: -1, y: 1 })
                })
            })
        })
    })

    test('come back to overlapping from right', () => {
        const head = { x: 1, y: 0 }
        const tail = { x: 0, y: 0 }
        const rope = new Rope(head, tail)

        rope.headMove(Direction.LEFT)

        expect(rope.headCoordinate()).toStrictEqual({ x: 0, y: 0 })
        expect(rope.tailCoordinate()).toStrictEqual({ x: 0, y: 0 })
    })

})

