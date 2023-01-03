export type FSRoot = {
    [key: string]: FSNode
}
export type FSNode = File
export type File = {
    size: number,
    type: FSNodeType.FILE
}
export enum FSNodeType { FILE }

export const totalSizeOfSmallFolders = (terminalFeed: string): number => {
    return -1
}

export const buildFileSystemTreeFrom = (terminalFeed: string): FSRoot => {
    const terminalFeedRows = terminalFeed
        .split("\n")
        .filter((row) => row !== "")

    const systemTree: FSRoot = {}
    terminalFeedRows.forEach((row) => {
        if (isACommand(row)) {
            return
        }

        const [name, node] = terminalFeedRowToFSNode(row)
        systemTree[name] = node
    })

    return systemTree
}

const terminalFeedRowToFSNode = (terminalFeedRow: string): [string, FSNode] => {
    const [size, name] = terminalFeedRow.split(" ")
    return [name, { size: parseInt(size), type: FSNodeType.FILE } as FSNode]
}

const isACommand = (row: string) => row.charAt(0) == "$"
