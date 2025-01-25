export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;


export function computeDistanceString(meters_total: number): string {
    let meters;
    let kilometers;
    let megameters;

    // 0-999 m -> show meters
    if (meters_total < 1000) {
        return `${meters_total}m`;
    }

    // 1-100 km -> show kilometers with 1 decimal
    if (meters_total >= 1000 && meters_total <= 100_000) {
        kilometers = Math.floor(meters_total / 1000);
        meters = meters_total % 1000;
        let decimal = Math.round(meters / 100);
        if(decimal === 0) {
            return `${kilometers}km`
        } else if(decimal === 10) {
            return `${kilometers + 1}km`
        } else {
            return `${kilometers}.${decimal}km`
        }
    }

    // 100-10'000 km -> show kilometers without decimals
    if (meters_total > 100_000 && meters_total < 9_999_500) {
        kilometers = Math.round(meters_total / 1000);
        return `${kilometers}km`;
    }

    // > 10'000 km -> show with thousands separator
    megameters = Math.round(meters_total / 1_000_000);
    let km = Math.round((meters_total % 1_000_000) / 1000).toString().padStart(3, "0");
    if(km === "1000") {
        km = "000";
    }
    return `${megameters}'${km}km`
}


export function computeTimeString(seconds_total: number): string {
    let minutes;
    let hours;
    let days;

    if (seconds_total < MINUTE) {
        return `${seconds_total}s`;
    }
    
    if (seconds_total < (HOUR - 30)) {  // < 59 min 30 s
        minutes = Math.round(seconds_total / 60);
        return `${minutes}min`;
    }

    if (seconds_total < (DAY - 30)) {  // < 23 h 59 min 30 s
        hours = Math.floor(seconds_total / HOUR);
        minutes = Math.round((seconds_total % HOUR) / 60);
        if(minutes < MINUTE) {
            return `${hours}h ${minutes}min`
        } else {
            return `${hours + 1}h 0min`
        }
    }

    if (seconds_total >= (DAY - 30) && seconds_total < DAY) {
        return `1d 0h 0min`
    }

    days = Math.floor(seconds_total / DAY);
    hours = Math.floor((seconds_total % DAY) / HOUR);
    minutes = Math.round((seconds_total % HOUR) / 60);
    if (minutes === 60) {
        hours += 1;
        minutes = 0;
    }
    if (hours === 24) {
        days += 1;
        hours = 0;
    }
    return `${days}d ${hours}h ${minutes}min`
}
