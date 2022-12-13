enum RoundResult { WIN, LOSS, DRAW }
enum Shape { ROCK, PAPER, SCISSORS }

type StrategyInterpreter = (roundRow: string) => [Shape, RoundResult]

export const totalScoreWith = (strategyGuide: string, strategyInterpreter: StrategyInterpreter) => {
    return strategyGuide
        .split("\n")
        .filter((roundRow) => roundRow !== "")
        .map(strategyInterpreter)
        .map(([chosenShape, roundResult]: [Shape, RoundResult]) => roundPointsFor(chosenShape, roundResult))
        .reduce((acc, points) => acc += points)
}

export const wrongStrategyInterpreter: StrategyInterpreter = (roundRow: string): [Shape, RoundResult] => {
    const [opponentShapeRaw, chosenShapeRaw] = roundRow.split(' ')
    const opponentShape = opponentShapeFrom(opponentShapeRaw)
    const chosenShape = chosenShapeFrom(chosenShapeRaw)
    const roundResult = roundResultOf(chosenShape, opponentShape)
    return [chosenShape, roundResult] as [Shape, RoundResult]
}

export const rightStrategyInterpreter: StrategyInterpreter = (roundRow: string): [Shape, RoundResult] => {
    const [opponentShapeRaw, chosenShapeRaw] = roundRow.split(' ')
    const opponentShape = opponentShapeFrom(opponentShapeRaw)
    const desiredRoundResult = roundResultFrom(chosenShapeRaw)
    const chosenShape = chooseShapeFor(opponentShape, desiredRoundResult)
    return [chosenShape, desiredRoundResult] as [Shape, RoundResult]
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

const roundResultFrom = (str: string): RoundResult => {
    switch (str) {
        case "X": return RoundResult.LOSS
        case "Y": return RoundResult.DRAW
        case "Z": return RoundResult.WIN
        default: throw Error("Cannot map round result from " + str)
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

const chooseShapeFor = (opponentShape: Shape, desiredRoundResult: RoundResult): Shape => {
    switch (opponentShape) {
        case Shape.ROCK:
            switch (desiredRoundResult) {
                case RoundResult.WIN: return Shape.PAPER
                case RoundResult.LOSS: return Shape.SCISSORS
            }
            break
        case Shape.PAPER:
            switch (desiredRoundResult) {
                case RoundResult.WIN: return Shape.SCISSORS
                case RoundResult.LOSS: return Shape.ROCK
            }
            break
        case Shape.SCISSORS:
            switch (desiredRoundResult) {
                case RoundResult.WIN: return Shape.ROCK
                case RoundResult.LOSS: return Shape.PAPER
            }
            break
    }

    return opponentShape
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
