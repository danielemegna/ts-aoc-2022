type PacketValue = number | number[] 

export class PacketValuesComparator {
  compare(first: PacketValue, second: PacketValue): ComparisonResult {
    return first === second
      ? ComparisonResult.CONTINUE
      : first < second
        ? ComparisonResult.RIGHT
        : ComparisonResult.WRONG
  }

}

export enum ComparisonResult {
  RIGHT,
  WRONG,
  CONTINUE
}

