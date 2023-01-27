type Coordinate = [number, number]

export class TreeMap {
    treeHeights: number[][]

    constructor(treeHeights: number[][]) {
        this.treeHeights = treeHeights
    }

    getTreeHeight([x, y]: Coordinate): number {
        return this.treeHeights[y][x]
    }

    isVisible([x, y]: Coordinate): boolean {
        const mapSize: number = this.treeHeights.length
        if (x === 0 || y === 0 || x === mapSize || y === mapSize)
            return true

        const currentTree = this.treeHeights[y][x]

        const treesOnTheRight = this.treeHeights[y].slice(x + 1)
        if (currentTree > Math.max(...treesOnTheRight))
            return true

        const treesOnTheLeft = this.treeHeights[y].slice(0, x)
        if (currentTree > Math.max(...treesOnTheLeft))
            return true

        const treesOnTheTop = this.treeHeights.slice(0, y).map((row) => row[x])
        if (currentTree > Math.max(...treesOnTheTop))
            return true

        const treesOnTheBottom = this.treeHeights.slice(y + 1).map((row) => row[x])
        if (currentTree > Math.max(...treesOnTheBottom))
            return true

        return false
    }

    getVisibleTreesCount(): number {
        let result = 0
        const mapSize = this.treeHeights.length
        for (let y = 0; y < mapSize; y++) {
            for (let x = 0; x < mapSize; x++) {
                if (this.isVisible([x, y]))
                    result += 1
            }
        }
        return result
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
    const treeMap = treeMapFrom(input)
    return treeMap.getVisibleTreesCount()
}
