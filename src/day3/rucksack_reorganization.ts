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
            return firstCompartmentItems.filter(
                c => secondCompartmentContent.includes(c)
            )[0]
        })
        .map((item) => getItemPriority(item))
        .reduce((acc, v) => acc += v)
}

export const getItemPriority = (item: string): number => {
    if (isLowerCase(item))
        return item.charCodeAt(0) - 96
    return item.charCodeAt(0) - 38
}

const isLowerCase = (str: string) => str === str.toLocaleLowerCase()
