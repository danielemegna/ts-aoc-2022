export type FSRoot = {
    [key: string]: FSNode
}
export type FSNode = File | Directory
export type File = {
    size: number,
    type: FSNodeType.FILE
}
export type Directory = {
    type: FSNodeType.DIRECTORY
}
export enum FSNodeType { FILE, DIRECTORY }


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

        if (isADirectory(row)) {
            const dirname = parseDirectoryTerminalFeedRow(row)
            systemTree[dirname] = { type: FSNodeType.DIRECTORY } as Directory
            return
        }

        const [name, node] = parseFileTerminalFeedRow(row)
        systemTree[name] = node
    })

    return systemTree
}

const parseDirectoryTerminalFeedRow = (terminalFeedRow: string): string => {
    return terminalFeedRow.split(" ")[1]
}

const parseFileTerminalFeedRow = (terminalFeedRow: string): [string, File] => {
    const [size, name] = terminalFeedRow.split(" ")
    return [name, { size: parseInt(size), type: FSNodeType.FILE } as File]
}

const isACommand = (row: string) => row.charAt(0) == "$"
const isADirectory = (row: string) => row.startsWith("dir")
