type Coordinate = [number, number]
type TreeHeight = number

class TreeLine {
    treeHeights: TreeHeight[]

    constructor(treeHeights: TreeHeight[]) {
        this.treeHeights = treeHeights
    }

    isLowerThan(subjectTree: TreeHeight) {
        return subjectTree > Math.max(...this.treeHeights)
    }

    getScenicScoreFor(subjectTree: TreeHeight): number {
        let result = 0
        for (const x of this.treeHeights) {
            result++;
            if (x >= subjectTree)
                break
        }
        return result
    }
}

export class TreeMap {
    treeHeights: TreeHeight[][]

    constructor(treeHeights: TreeHeight[][]) {
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

        if (this.getTopTreeLine([x, y]).isLowerThan(currentTree)) return true
        if (this.getLeftTreeLine([x, y]).isLowerThan(currentTree)) return true
        if (this.getBottomTreeLine([x, y]).isLowerThan(currentTree)) return true
        if (this.getRightTreeLine([x, y]).isLowerThan(currentTree)) return true

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

        const topTreeLine = this.getTopTreeLine([x, y])
        const leftTreeLine = this.getLeftTreeLine([x, y])
        const bottomTreeLine = this.getBottomTreeLine([x, y])
        const rightTreeLine = this.getRightTreeLine([x, y])

        return topTreeLine.getScenicScoreFor(currentTreeHeight) *
            leftTreeLine.getScenicScoreFor(currentTreeHeight) *
            bottomTreeLine.getScenicScoreFor(currentTreeHeight) *
            rightTreeLine.getScenicScoreFor(currentTreeHeight)
    }

    getTreeHeight([x, y]: Coordinate): TreeHeight {
        return this.treeHeights[y][x]
    }

    private getTopTreeLine([x, y]: Coordinate): TreeLine {
        return new TreeLine(this.treeHeights.slice(0, y).map((row) => row[x]).reverse())
    }

    private getLeftTreeLine([x, y]: Coordinate): TreeLine {
        return new TreeLine(this.treeHeights[y].slice(0, x).reverse())
    }

    private getBottomTreeLine([x, y]: Coordinate): TreeLine {
        return new TreeLine(this.treeHeights.slice(y + 1).map((row) => row[x]))
    }

    private getRightTreeLine([x, y]: Coordinate): TreeLine {
        return new TreeLine(this.treeHeights[y].slice(x + 1))
    }
}

export function treeMapFrom(treeMapInput: string): TreeMap {
    const treeHeights: TreeHeight[][] = treeMapInput
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
