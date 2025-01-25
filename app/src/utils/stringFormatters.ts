export function computeDistanceString(meters_total: number): string {
    if (meters_total < 1000) {  // < 1 km
        return `${meters_total} m`;
    }
    if (meters_total > 100_000) {  // > 100 km
        const kilometers = Math.floor(meters_total / 1000);
        return `${kilometers} km`;
    }
    // 1 km <= meters_total <= 100 km
    const kilometers = Math.floor(meters_total / 1000);
    const meters = meters_total % 1000;
    const decimal = Math.round(meters / 100);
    if(decimal === 0) {
        return `${kilometers} km`
    } else if(decimal === 10) {
        return `${kilometers + 1} km`
    } else {
        return `${kilometers}.${decimal} km`
    }
}


export function computeTimeString(seconds_total: number): string {
    let formattedTime: string;
    if (seconds_total < 60) {
        formattedTime = `${seconds_total} s`;
    } else if (seconds_total < 3600) {
        let minutes = Math.floor(seconds_total / 60);
        const seconds = seconds_total % 60;
        if(seconds > 30) {minutes += 1};
        formattedTime = `${minutes} min`;
    } else {
        const hours = Math.floor(seconds_total / 3600);
        const minutes = Math.floor((seconds_total / 60) - (hours * 60));
        if(minutes !== 0) {
            formattedTime = `${hours} h ${minutes} min`
        } else {
            formattedTime = `${hours} h`
        }
    }
    return formattedTime
}
