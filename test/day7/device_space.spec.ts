import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { buildFileSystemTreeFrom, Directory, File, totalSizeOfSmallFolders } from '../../src/day7/device_space';

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
                "b.txt": { size: 14848514 } as File,
                "c.dat": { size: 8504156 } as File,
                "d.log": { size: 8033020 } as File,
            } as Directory
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
                "b.txt": { size: 14848514 } as File,
                "a": {} as Directory,
                "c.dat": { size: 8504156 } as File,
                "d.log": { size: 8033020 } as File,
                "d": {} as Directory,
            } as Directory
            expect(actual).toStrictEqual(expected)
        })

        test('handle change-dir commands and subfolder content', () => {
            const terminalFeed = [
                "$ cd /",
                "$ ls",
                "dir a",
                "14848514 b.txt",
                "8504156 c.dat",
                "dir d",
                "$ cd a",
                "$ ls",
                "dir e",
                "29116 f",
                "2557 g",
                "62596 h.lst"
            ].join("\n") + "\n"

            const actual = buildFileSystemTreeFrom(terminalFeed)

            const expected = {
                "a": {
                    "e": {},
                    "f": { size: 29116 },
                    "g": { size: 2557 },
                    "h.lst": { size: 62596 }
                } as Directory,
                "b.txt": { size: 14848514 } as File,
                "c.dat": { size: 8504156 } as File,
                "d": {} as Directory,
            } as Directory
            expect(actual).toStrictEqual(expected)
        })

        test('build filesystem tree from provided example', () => {
            const actual = buildFileSystemTreeFrom(providedInputExample)

            const expected = {
                "a": {
                    "e": {
                        "i": { size: 584 }
                    },
                    "f": { size: 29116 },
                    "g": { size: 2557 },
                    "h.lst": { size: 62596 }
                } as Directory,
                "b.txt": { size: 14848514 } as File,
                "c.dat": { size: 8504156 } as File,
                "d": {
                    "j": { size: 4060174 },
                    "d.log": { size: 8033020 },
                    "d.ext": { size: 5626152 },
                    "k": { size: 7214296 }
                } as Directory,
            } as Directory
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