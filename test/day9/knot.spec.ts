import { expect, test } from '@jest/globals';
import { Coordinate, Knot } from '../../src/day9/knot';
import { Direction } from '../../src/day9/rope_bridge';

describe('knot', () => {

    test('move knot', () => {

        assertCoordinateAfterMove(Direction.UP, { x: 0, y: 1 })
        assertCoordinateAfterMove(Direction.LEFT, { x: -1, y: 0 })
        assertCoordinateAfterMove(Direction.DOWN, { x: 0, y: -1 })
        assertCoordinateAfterMove(Direction.RIGHT, { x: 1, y: 0 })

        function assertCoordinateAfterMove(direction: Direction, expected: Coordinate) {
            const knot = new Knot()
            knot.move(direction)
            expect(knot.getCoordinate()).toStrictEqual(expected)
        }

    })

    describe('follow a coordinate', () => {

        describe('on same line', () => {

            test('to the right', () => {
                assertFollowCoordinate({ x: 2, y: 0 }, { x: 1, y: 0 })
            })

            test('to the top', () => {
                assertFollowCoordinate({ x: 0, y: 2 }, { x: 0, y: 1 })
            })

            test('to the left', () => {
                assertFollowCoordinate({ x: -2, y: 0 }, { x: -1, y: 0 })
            })

            test('to the bottom', () => {
                assertFollowCoordinate({ x: 0, y: -2 }, { x: 0, y: -1 })
            })

        })

        describe('move with head and tail overlapping only moves head', () => {

            test('right', () => {
                assertFollowCoordinate({ x: 1, y: 0 }, { x: 0, y: 0 })
            })

            test('up', () => {
                assertFollowCoordinate({ x: 0, y: 1 }, { x: 0, y: 0 })
            })

            test('left', () => {
                assertFollowCoordinate({ x: -1, y: 0 }, { x: 0, y: 0 })
            })

            test('down', () => {
                assertFollowCoordinate({ x: 0, y: -1 }, { x: 0, y: 0 })
            })

        })


        describe('tail should not follow head when', () => {

            describe('touching diagonally', () => {

                test('moving up from right', () => {
                    assertFollowCoordinate({ x: 1, y: 1 }, { x: 0, y: 0 })
                })

                test('moving down from right', () => {
                    assertFollowCoordinate({ x: 1, y: -1 }, { x: 0, y: 0 })
                })
            })

            describe('touching on same line', () => {

                test('moving left from top-right', () => {
                    assertFollowCoordinate({ x: 0, y: 1 }, { x: 0, y: 0 })
                })

                test('moving up from bottom-right', () => {
                    assertFollowCoordinate({ x: 1, y: 0 }, { x: 0, y: 0 })
                })
            })

        })

        describe('tail should follow head diagonally when not touching and are not in the same lines', () => {

            describe('from top-right', () => {
                test('moving up', () => {
                    assertFollowCoordinate({ x: 1, y: 2 }, { x: 1, y: 1 })
                })

                test('moving right', () => {
                    assertFollowCoordinate({ x: 2, y: 1 }, { x: 1, y: 1 })
                })

                test('moving right-up', () => {
                    assertFollowCoordinate({ x: 2, y: 2 }, { x: 1, y: 1 })
                })
            })

            describe('from bottom-right', () => {
                test('moving down', () => {
                    assertFollowCoordinate({ x: 1, y: -2 }, { x: 1, y: -1 })
                })

                test('moving right', () => {
                    assertFollowCoordinate({ x: 2, y: -1 }, { x: 1, y: -1 })
                })
            })

            describe('from top-left', () => {
                test('moving left', () => {
                    assertFollowCoordinate({ x: -2, y: 1 }, { x: -1, y: 1 })
                })

                test('moving up', () => {
                    assertFollowCoordinate({ x: -1, y: 2 }, { x: -1, y: 1 })
                })
            })

            describe('from bottom-left', () => {
                test('moving left', () => {
                    assertFollowCoordinate({ x: -2, y: -1 }, { x: -1, y: -1 })
                })

                test('moving down', () => {
                    assertFollowCoordinate({ x: -1, y: -2 }, { x: -1, y: -1 })
                })
            })

            describe('digonal moves on same line', () => {

                describe('with head on the right', () => {
                    test('moving right-up', () => {
                        assertFollowCoordinate({ x: 2, y: 1 }, { x: 1, y: 1 })
                    })

                    test('moving right-down', () => {
                        assertFollowCoordinate({ x: 2, y: -1 }, { x: 1, y: -1 })
                    })

                    test('moving left-up', () => {
                        assertFollowCoordinate({ x: 0, y: 1 }, { x: 0, y: 0 })
                    })
                })

                describe('with head on the left', () => {
                    test('moving left-up', () => {
                        assertFollowCoordinate({ x: -2, y: 1 }, { x: -1, y: 1 })
                    })

                    test('moving left-down', () => {
                        assertFollowCoordinate({ x: -2, y: -1 }, { x: -1, y: -1 })
                    })
                })

                describe('with head on top', () => {
                    test('moving right-up', () => {
                        assertFollowCoordinate({ x: 1, y: 2 }, { x: 1, y: 1 })
                    })

                    test('moving left-up', () => {
                        assertFollowCoordinate({ x: -1, y: 2 }, { x: -1, y: 1 })
                    })
                })
            })
        })

        test('come back to overlapping from right', () => {
            assertFollowCoordinate({ x: 0, y: 0 }, { x: 0, y: 0 })
        })
    })

    function assertFollowCoordinate(toFollow: Coordinate, expected: Coordinate) {
        const knot = new Knot({ x: 0, y: 0 })
        knot.follow(toFollow)
        expect(knot.getCoordinate()).toStrictEqual(expected)
    }

})