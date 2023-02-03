type Coordinate = [number, number]

export class TreeMap {
    treeHeights: number[][]

    constructor(treeHeights: number[][]) {
        this.treeHeights = treeHeights
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

    isVisible([x, y]: Coordinate): boolean {
        const mapSize: number = this.treeHeights.length
        if (x === 0 || y === 0 || x === mapSize || y === mapSize)
            return true

        const currentTree = this.treeHeights[y][x]

        const treesOnTheTop = this.getTreesOnTheTop([x, y])
        if (currentTree > Math.max(...treesOnTheTop))
            return true

        const treesOnTheLeft = this.getTreesOnTheLeft([x, y])
        if (currentTree > Math.max(...treesOnTheLeft))
            return true

        const treesOnTheBottom = this.getTreesOnTheBottom([x, y])
        if (currentTree > Math.max(...treesOnTheBottom))
            return true

        const treesOnTheRight = this.getTreesOnTheRight([x, y])
        if (currentTree > Math.max(...treesOnTheRight))
            return true

        return false
    }

    getHightestScenicScore(): number {
        let max = 0
        const mapSize = this.treeHeights.length
        for (let y = 0; y < mapSize; y++) {
            for (let x = 0; x < mapSize; x++) {
                const score = this.getScenicScore([x, y])
                if (max < score)
                    max = score
            }
        }
        return max
    }

    getScenicScore([x, y]: Coordinate): number {
        const mapSize: number = this.treeHeights.length
        if (x === 0 || y === 0 || x === mapSize || y === mapSize)
            return 0

        const currentTreeHeight = this.getTreeHeight([x, y])

        const treesOnTheTop = this.getTreesOnTheTop([x, y])
        let topScore = 0
        for (const x of treesOnTheTop) {
            topScore++;
            if (x >= currentTreeHeight)
                break
        }

        const treesOnTheLeft = this.getTreesOnTheLeft([x, y])
        let leftScore = 0
        for (const x of treesOnTheLeft) {
            leftScore++;
            if (x >= currentTreeHeight)
                break
        }

        const treesOnTheBottom = this.getTreesOnTheBottom([x, y])
        let bottomScore = 0
        for (const x of treesOnTheBottom) {
            bottomScore++;
            if (x >= currentTreeHeight)
                break
        }

        const treesOnTheRight = this.getTreesOnTheRight([x, y])
        let rightScore = 0
        for (const x of treesOnTheRight) {
            rightScore++;
            if (x >= currentTreeHeight)
                break
        }

        return topScore * leftScore * bottomScore * rightScore
    }
    

    getTreeHeight([x, y]: Coordinate): number {
        return this.treeHeights[y][x]
    }

    private getTreesOnTheTop([x, y]: Coordinate): any {
        return this.treeHeights.slice(0, y).map((row) => row[x]).reverse()
    }

    private getTreesOnTheLeft([x, y]: Coordinate): any {
        return this.treeHeights[y].slice(0, x).reverse()
    }

    private getTreesOnTheBottom([x, y]: Coordinate): any {
        return this.treeHeights.slice(y + 1).map((row) => row[x])
    }

    private getTreesOnTheRight([x, y]: Coordinate): any {
        return this.treeHeights[y].slice(x + 1)
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

export function highestScenicScoreFor(input: string) {
    const treeMap = treeMapFrom(input)
    return treeMap.getHightestScenicScore()
}
