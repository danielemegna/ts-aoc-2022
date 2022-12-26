type RucksacksInventory = String

export const prioritiesSumOfSharedItems = (rucksacksInventory: RucksacksInventory): number => {
    return computeWith(rucksacksInventory, compartmentSharedItemExtractor)
}

export const prioritiesSumOfThreeElfGroupBadges = (rucksacksInventory: RucksacksInventory): number => {
    return computeWith(rucksacksInventory, threeElfGroupsBadgeExtractor)
}

type ItemsExtractor = (rucksacksInventoryRows: string[]) => string[]

const computeWith = (rucksacksInventory: RucksacksInventory, itemsExtractor: ItemsExtractor): number => {
    const rucksacksInventoryRows = rucksacksInventory
        .split("\n")
        .filter((row) => row !== "")

    const items = itemsExtractor(rucksacksInventoryRows)

    return items
        .map((item) => getItemPriority(item))
        .reduce((acc, v) => acc += v)
}

const threeElfGroupsBadgeExtractor: ItemsExtractor = (inventoryRows: string[]) => {
    const threeElfGroups = chunkArray(inventoryRows, 3)

    const elfGroupsBadges = threeElfGroups
        .map(([firstElfRucksack, secondElfRucksack, thirdElfRucksack]) => {
            const firstElfItems = Array.from(new Set(firstElfRucksack)) as string[]
            return firstElfItems.find(c => secondElfRucksack.includes(c) && thirdElfRucksack.includes(c))!
        })

    return elfGroupsBadges
}

const compartmentSharedItemExtractor: ItemsExtractor = (inventoryRows: string[]) => {
    return inventoryRows
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

const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize)
        chunks.push(chunk)
    }
    return chunks
}