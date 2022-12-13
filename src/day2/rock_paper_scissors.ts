enum RoundResult { WIN, LOSS, DRAW }
enum Shape { ROCK, PAPER, SCISSORS }

export const totalScoreWith = (strategyGuide: string) => {
    return strategyGuide
        .split("\n")
        .filter((roundRow) => roundRow !== "")
        .map((roundRow: string) => {
            const [opponentShape, chosenShape] = roundRow.split(' ')
            return [opponentShapeFrom(opponentShape), chosenShapeFrom(chosenShape)] as [Shape, Shape]
        })
        .map(([opponentShape, chosenShape]: [Shape, Shape]) => {
            const roundResult = roundResultOf(chosenShape, opponentShape)
            return [chosenShape, roundResult] as [Shape, RoundResult]
        })
        .map(([chosenShape, roundResult]: [Shape, RoundResult]) => {
            return roundPointsFor(chosenShape, roundResult)
        })
        .reduce((acc, points) => acc += points)
}

const opponentShapeFrom = (str: string): Shape => {
    switch (str) {
        case "A": return Shape.ROCK
        case "B": return Shape.PAPER
        case "C": return Shape.SCISSORS
        default: throw Error("Cannot map shape from " + str)
    }
}

const chosenShapeFrom = (str: string): Shape => {
    switch (str) {
        case "X": return Shape.ROCK
        case "Y": return Shape.PAPER
        case "Z": return Shape.SCISSORS
        default: throw Error("Cannot map shape from " + str)
    }
}

const roundResultOf = (chosenShape: Shape, opponentShape: Shape): RoundResult => {
    switch (opponentShape) {
        case Shape.ROCK:
            switch (chosenShape) {
                case Shape.PAPER: return RoundResult.WIN
                case Shape.SCISSORS: return RoundResult.LOSS
            }
            break
        case Shape.PAPER:
            switch (chosenShape) {
                case Shape.SCISSORS: return RoundResult.WIN
                case Shape.ROCK: return RoundResult.LOSS
            }
            break
        case Shape.SCISSORS:
            switch (chosenShape) {
                case Shape.ROCK: return RoundResult.WIN
                case Shape.PAPER: return RoundResult.LOSS
            }
            break
    }

    return RoundResult.DRAW
}

const roundPointsFor = (chosenShape: Shape, roundResult: RoundResult): number => {
    const chosenShapePoints = (() => {
        switch (chosenShape) {
            case Shape.ROCK: return 1
            case Shape.PAPER: return 2
            case Shape.SCISSORS: return 3
        }
    })()
    const roundPoints = (() => {
        switch (roundResult) {
            case RoundResult.WIN: return 6
            case RoundResult.DRAW: return 3
            case RoundResult.LOSS: return 0
        }
    })()
    return chosenShapePoints + roundPoints
}
