import { describe, expect, test } from '@jest/globals';
import { PacketValuesComparator, ComparisonResult } from '../../src/day13/packet_values_comparator';

describe('PacketValuesComparator', () => {
  const comparator = new PacketValuesComparator()

  describe('two integers compare', () => {

    test('return RIGHT when first is lower', () =>{
      const actual = comparator.compare(1, 3)
      expect(actual).toBe(ComparisonResult.RIGHT)
    })

    test('return WRONG when first is greater', () =>{
      const actual = comparator.compare(10, 3)
      expect(actual).toBe(ComparisonResult.WRONG)
    })

    test('return CONTINUE when first is greater', () =>{
      const actual = comparator.compare(2, 2)
      expect(actual).toBe(ComparisonResult.CONTINUE)
    })  
  })

  describe('two lists compare with same lenght', () => {

    test('return RIGHT when list with only one element and first is lower', () => {
      const actual = comparator.compare([1],[3])
      expect(actual).toBe(ComparisonResult.RIGHT)
    })

    test('return WRONG when list with only one element and second is greater', () => {
      const actual = comparator.compare([9],[4])
      expect(actual).toBe(ComparisonResult.WRONG)
    })

    test.skip('return CONTINUE when list with only one element are equal', () => {
      const actual = comparator.compare([5],[5])
      expect(actual).toBe(ComparisonResult.CONTINUE)
    })

  } 

  )
  

})
