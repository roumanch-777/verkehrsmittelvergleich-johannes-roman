export function computeDistanceString(meters_total: number): string {
    let formattedDistance: string;
    if (meters_total < 1000) {
        formattedDistance = `${meters_total} m`;
    } else {
        const kilometers = Math.floor(meters_total / 1000);
        const meters = meters_total % 1000;
        if(kilometers < 100) {
            const decimal = Math.round(meters / 100);
            if(decimal === 0) {
                formattedDistance = `${kilometers} km`
            } else if(decimal === 10) {
                formattedDistance = `${kilometers + 1} km`
            } else {
                formattedDistance = `${kilometers}.${decimal} km`
            }
        } else {
            formattedDistance = `${kilometers} km`;
        }
    }
    return formattedDistance
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
