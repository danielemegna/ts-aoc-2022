export type File = { size: number }
export type Directory = {
    [key: string]: File | Directory
}

const isFile = (node: Directory | File): node is File => node.hasOwnProperty("size")
const isDirectory = (node: Directory | File): node is Directory => !isFile(node)

export const totalSizeOfSmallFolders = (terminalFeed: string): number => {
    return -1
}

export const totalSizeOf = (directory: Directory): number => {
    let totalSize = 0
    for(let [_nodename, node] of Object.entries(directory)) {
        if(isFile(node)) {
            totalSize += node.size
        } else if(isDirectory(node)) {
            totalSize += totalSizeOf(node)
        }
    }
    return totalSize
}

export const buildFileSystemTreeFrom = (terminalFeed: string): Directory => {
    const terminalFeedRows = terminalFeed
        .split("\n")
        .filter((row) => row !== "" && row !== "$ cd /")

    const subnavigationStack: Directory[] = []
    const rootDirectory: Directory = {}
    let currentDir = rootDirectory

    for (let row of terminalFeedRows) {
        if (isAListCommand(row))
            continue

        if (isAGoToUpperDirCommand(row)) {
            if (subnavigationStack.length === 0) throw new Error("Cannot go upper root folder")
            currentDir = subnavigationStack.pop()!
            continue
        }

        if (isAChangeDirCommand(row)) {
            subnavigationStack.push(currentDir)
            const dirname = row.split(" ")[2]
            const newDir = {} as Directory
            currentDir[dirname] = newDir
            currentDir = newDir
            continue
        }

        // we are on `list command` output here
        if (isADirectory(row)) {
            const [dirname, directory] = parseDirectoryFromListOutput(row)
            currentDir[dirname] = directory
        } else {
            const [filename, file] = parseFileFromListOutput(row)
            currentDir[filename] = file
        }

    }

    return rootDirectory
}

const parseDirectoryFromListOutput = (terminalFeedRow: string): [string, Directory] => {
    const dirname = terminalFeedRow.split(" ")[1]
    const newDirectory = {} as Directory
    return [dirname, newDirectory]
}

const parseFileFromListOutput = (terminalFeedRow: string): [string, File] => {
    const [size, filename] = terminalFeedRow.split(" ")
    const file = { size: parseInt(size) } as File
    return [filename, file]
}

const isAListCommand = (row: string) => row === "$ ls"
const isAChangeDirCommand = (row: string) => row.startsWith("$ cd")
const isAGoToUpperDirCommand = (row: string) => row === "$ cd .."
const isADirectory = (row: string) => row.startsWith("dir")
