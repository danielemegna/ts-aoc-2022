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

    let pointers: Directory[] = [directory]

    for (let i = 0; i < terminalFeedRows.length; i++) {
        const row = terminalFeedRows[i]
        if(pointers.length === 0) throw new Error("Empty pointers!!")
        const currentDir = pointers.at(-1)!

        if (isACommand(row)) {

            if (isAChangeDirCommand(row)) {
                if (isAGoToUpperDirCommand(row)) {
                    if(pointers.length === 1) throw new Error("Cannot go upper root folder")
                    pointers.pop()
                    continue
                }

                // we are changing dir here
                const dirname = row.split(" ")[2]
                const newDir = {} as Directory
                currentDir[dirname] = newDir
                pointers.push(newDir)
            }

            continue
        }

        // we are on an ls output here
        if (isADirectory(row)) {
            const dirname = parseDirectoryTerminalFeedRow(row)
            currentDir[dirname] = {} as Directory
        } else {
            const [filename, file] = parseFileTerminalFeedRow(row)
            currentDir[filename] = file
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
const isAGoToUpperDirCommand = (row: string) => row === "$ cd .."
const isADirectory = (row: string) => row.startsWith("dir")
