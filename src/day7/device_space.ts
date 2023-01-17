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

    return directoryFrom(terminalFeedRows)
}

const directoryFrom = (terminalFeedRows: string[]): Directory => {
    const directory: Directory = {}

    for (var row of terminalFeedRows) {
        if (isACommand(row)) {

            if (isAChangeDirCommand(row)) {
                directory["a"] = directoryFrom(
                    terminalFeedRows.slice(terminalFeedRows.indexOf(row) + 1)
                )
                break
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

    return directory
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
const isADirectory = (row: string) => row.startsWith("dir")
