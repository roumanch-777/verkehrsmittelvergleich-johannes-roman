const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const computeDurationAxis = (value: number | string) => {
    // this is just to make the type checker happy. it should never happen
    if (typeof value === "string") return value;

    if (value > DAY) {
        // round on 0.5 d precision: round the double of the value, then divide by 2
        return `${Math.round((value / DAY) * 2) / 2} d`;
    } else if (value > (10 * HOUR)) {
        // round on 1 hour precision: round the number
        return `${Math.round(value / HOUR)} h`;
    } else if (value > HOUR) {
        // round on 30 min precision: round the double of the value, then divide by 2
        return `${Math.round((value / HOUR) * 2) / 2} h`;
    } else if (value > MINUTE) {
        // round on 5 min precision: round the 5th of the value, then multiply by 5
        return `${Math.round(value / (60 * 5)) * 5} min`;
    } else {
        return "0 min";
    }
};


const KM = 1000;

export const computeDistanceAxis = (value: number | string) => {
    // this is just to make the type checker happy. it should never happen
    if (typeof value === "string") return value;

    if (value > (100 * KM)) {
        // round on 50 km precision: round the 50th of the value, then multiply by 50
        return `${Math.round(value / (1000 * 50)) * 50} km`;
    } else if (value > KM) {
        // round on 0.5 km precision: round the double of the value, then divide by 2
        return `${Math.round((value / 1000) * 2) / 2} km`;
    } else {
        return `${value} m`;
    }
}
