import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { buildFileSystemTreeFrom, Directory, File, FSNodeType, FSRoot, totalSizeOfSmallFolders } from '../../src/day7/device_space';

const providedInputExample = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`

describe('first part resolution', () => {

    describe("build filesystem tree from terminal feed", () => {

        test('root folder with only files', () => {
            const terminalFeed = [
                "$ cd /",
                "$ ls",
                "14848514 b.txt",
                "8504156 c.dat",
                "8033020 d.log"
            ].join("\n") + "\n"

            const actual = buildFileSystemTreeFrom(terminalFeed)

            const expected = {
                "b.txt": { size: 14848514, type: FSNodeType.FILE } as File,
                "c.dat": { size: 8504156, type: FSNodeType.FILE } as File,
                "d.log": { size: 8033020, type: FSNodeType.FILE } as File,
            } as FSRoot
            expect(actual).toStrictEqual(expected)
        })


        test('root folder with files and empty directories', () => {
            const terminalFeed = [
                "$ cd /",
                "$ ls",
                "14848514 b.txt",
                "dir a",
                "8504156 c.dat",
                "8033020 d.log",
                "dir d",
            ].join("\n") + "\n"

            const actual = buildFileSystemTreeFrom(terminalFeed)

            const expected = {
                "b.txt": { size: 14848514, type: FSNodeType.FILE } as File,
                "a": { type: FSNodeType.DIRECTORY } as Directory,
                "c.dat": { size: 8504156, type: FSNodeType.FILE } as File,
                "d.log": { size: 8033020, type: FSNodeType.FILE } as File,
                "d": { type: FSNodeType.DIRECTORY } as Directory,
            } as FSRoot
            expect(actual).toStrictEqual(expected)
        })

    })

    test.skip('solve with first provided example', () => {
        const actual = totalSizeOfSmallFolders(providedInputExample)
        expect(actual).toBe(94853 + 584)
    })

    test.skip('solve with input from file', () => {
        const input = readFileSync('./test/day6/input.txt', 'utf-8')
        const actual = totalSizeOfSmallFolders(input)
        expect(actual).toBe(1623)
    })

})