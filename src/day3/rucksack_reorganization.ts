export const prioritiesSumOfThreeElfGroupBadges = (rucksacksInventory: string): number => {
    return rucksacksInventory
        .split("\n")
        .filter((row) => row !== "")
        .reduce((elfGroups, row) => {
            const currentElfGroup = elfGroups[elfGroups.length - 1]
            const shouldStartNewElfGroup = elfGroups.length == 0 || currentElfGroup.length == 3
            if (shouldStartNewElfGroup) {
                elfGroups.push([row])
                return elfGroups
            }

            currentElfGroup.push(row)
            elfGroups[elfGroups.length - 1] = currentElfGroup
            return elfGroups
        }, [] as string[][])
        .map(([firstElfRucksack, secondElfRucksack, thirdElfRucksack]) => {
            const firstElfItems = Array.from(new Set(firstElfRucksack)) as string[]
            return firstElfItems.find(c => secondElfRucksack.includes(c) && thirdElfRucksack.includes(c))!
        })
        .map((item) => getItemPriority(item))
        .reduce((acc, v) => acc += v)
}

export const prioritiesSumOfSharedItems = (rucksacksInventory: string): number => {
    return rucksacksInventory
        .split("\n")
        .filter((row) => row !== "")
        .map((row) => {
            const halfLenght = row.length / 2
            const firstCompartmentContent = row.slice(0, halfLenght)
            const secondCompartmentContent = row.slice(halfLenght)
            return [firstCompartmentContent, secondCompartmentContent] as [string, string]
        })
        .map(([firstCompartmentContent, secondCompartmentContent]) => {
            const firstCompartmentItems = Array.from(new Set(firstCompartmentContent)) as string[]
            return firstCompartmentItems.find(c => secondCompartmentContent.includes(c))!
        })
        .map((item) => getItemPriority(item))
        .reduce((acc, v) => acc += v)
}

const UPPERCASE_A_CHARCODE = 65
const LOWERCASE_A_CHARCODE = 97

export const getItemPriority = (item: string): number => {
    const itemCharCode = item.charCodeAt(0)
    if (isLowerCase(item))
        return itemCharCode - LOWERCASE_A_CHARCODE + 1
    return itemCharCode - UPPERCASE_A_CHARCODE + 1 + 26
}

const isLowerCase = (str: string) => str === str.toLocaleLowerCase()
