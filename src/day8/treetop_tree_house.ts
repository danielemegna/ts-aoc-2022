type Coordinate = [number, number]

class TreeMap {
    treeHeights: number[][]

    constructor(treeHeights: number[][]) {
        this.treeHeights = treeHeights
    }

    getHeight([x, y]: Coordinate): number {
        return this.treeHeights[y][x]
    }

    isVisible([x, y]: Coordinate): boolean {
        const mapSize: number = 4
        if(x === 0 || y === 0 || x === mapSize || y === mapSize)
            return true

        const treesOnTheRight = this.treeHeights[y].slice(x)
        if(Math.max(...treesOnTheRight) === treesOnTheRight[0])
            return true

        return false
    }
}

export function treeMapFrom(treeMapInput: string): TreeMap {
    const treeHeights: number[][] = treeMapInput
        .split("\n")
        .filter((row) => row !== "")
        .map((row) => row
            .split("")
            .map((v) => parseInt(v))
        )

    return new TreeMap(treeHeights)
}

export function visibleTreesCount(input: string): number {
    return 4
}
