import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { totalSizeOfSmallFolders } from '../../src/day7/device_space';

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