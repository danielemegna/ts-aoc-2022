export type File = { size: number }
export type Directory = {
    [key: string]: File | Directory
}

const isFile = (node: Directory | File): node is File => node.hasOwnProperty("size")
const isDirectory = (node: Directory | File): node is Directory => !isFile(node)

export const totalSizeOfSmallFolders = (terminalFeed: string): number => {
    const fileSystemTree = buildFileSystemTreeFrom(terminalFeed)
    return sumOfSmallFoldersSize(fileSystemTree)
}

const sumOfSmallFoldersSize = (directory: Directory): number => {
    let sum = 0

    const currentDirectorySize = totalSizeOf(directory)
    if (!isBigFolderSize(currentDirectorySize))
        sum += currentDirectorySize

    Object.entries(directory)
        .filter(([_subnodeName, subnode]) => isDirectory(subnode))
        .forEach(([_subnodeName, subnode]) => {
            sum += sumOfSmallFoldersSize(subnode as Directory)
        })

    return sum
}

const isBigFolderSize = (size: number): boolean => size > 100_000

export const smallestDisposableDirectorySize = (terminalFeed: string): number => {
    const fileSystemTree = buildFileSystemTreeFrom(terminalFeed)
    const totalFileSystemSize = 70_000_000
    const neededSpaceForUpdate = 30_000_000
    const usedSpace = totalSizeOf(fileSystemTree)
    const freeSpace = totalFileSystemSize - usedSpace
    const additionalNeededSpaceForUpdate = neededSpaceForUpdate - freeSpace

    const disposableDirectorySizes = findDisposableDirectorySizes(fileSystemTree, additionalNeededSpaceForUpdate)
    return Math.min(...disposableDirectorySizes)
}

const findDisposableDirectorySizes = (directory: Directory, neededSpace: number): number[] => {
    const disposableDirectorySizes: number[] = []
    Object.entries(directory)
        .filter(([_subnodeName, subnode]) => isDirectory(subnode))
        .forEach(([_subnodeName, subnode]) => {
            const subdirSize = totalSizeOf(subnode)
            if (subdirSize >= neededSpace)
                disposableDirectorySizes.push(subdirSize)

            const subnodeCandidates = findDisposableDirectorySizes(subnode as Directory, neededSpace)
            disposableDirectorySizes.push(...subnodeCandidates)
        })

    return disposableDirectorySizes
}

export const totalSizeOf = (node: Directory | File): number => {
    if (isFile(node))
        return node.size

    return Object.entries(node)
        .map(([_subnodeName, subnode]) => totalSizeOf(subnode))
        .reduce((acc, v) => acc += v, 0)
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
