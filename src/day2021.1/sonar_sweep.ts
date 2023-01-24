
export const countMeasurementIncreases = (input: string): number => {
    const measurements = input.split("\n")
        .filter((row) => row !== "")
        .map((measurement: string) => parseInt(measurement))
    
    let increases = 0
    for(let i = 0; i < measurements.length - 1; i ++) {
        increases += (measurements[i+1] > measurements[i]) ? 1 : 0
    }

    return increases
}