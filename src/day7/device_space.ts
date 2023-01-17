export type File = {
    size: number
}
export type Directory = {
    [key: string]: File | Directory,
}


export const totalSizeOfSmallFolders = (terminalFeed: string): number => {
    return -1
}

export const buildFileSystemTreeFrom = (terminalFeed: string): Directory => {
    const terminalFeedRows = terminalFeed
        .split("\n")
        .filter((row) => row !== "" && row !== "$ cd /")

    const [_, fileSystemTree] = directoryFrom(terminalFeedRows)
    return fileSystemTree
}

const directoryFrom = (terminalFeedRows: string[]): [number | undefined, Directory] => {
    const directory: Directory = {}

    for (let i = 0; i < terminalFeedRows.length; i++) {
        const row = terminalFeedRows[i]
        if (isACommand(row)) {

            if (isAChangeDirCommand(row)) {
                if (isAGoToUpperDirCommand(row)) {
                    return [i, directory]
                }

                const dirname = row.split(" ")[2]
                const restOfRows = terminalFeedRows.slice(i + 1)
                const [processedRows, dir] = directoryFrom(restOfRows)
                directory[dirname] = dir
                if(!processedRows)
                    break
                i += processedRows
            }

            continue
        }

        if (isADirectory(row)) {
            const dirname = parseDirectoryTerminalFeedRow(row)
            directory[dirname] = {} as Directory
        } else {
            const [filename, file] = parseFileTerminalFeedRow(row)
            directory[filename] = file
        }

    }

    return [undefined, directory]
}

const parseDirectoryTerminalFeedRow = (terminalFeedRow: string): string => {
    return terminalFeedRow.split(" ")[1]
}

const parseFileTerminalFeedRow = (terminalFeedRow: string): [string, File] => {
    const [size, name] = terminalFeedRow.split(" ")
    return [name, { size: parseInt(size) } as File]
}

const isACommand = (row: string) => row.charAt(0) == "$"
const isAChangeDirCommand = (row: string) => row.startsWith("$ cd")
const isAGoToUpperDirCommand = (row: string) => row === "$ cd .."
const isADirectory = (row: string) => row.startsWith("dir")
