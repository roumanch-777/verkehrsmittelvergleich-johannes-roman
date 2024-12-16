import { TravelMode } from "../models/travel-mode";

class RawTravelData {
    durationSeconds: number;
    distanceMeters: number;

    constructor(distanceMeters: number, durationSeconds: number) {
        this.distanceMeters = distanceMeters;
        this.durationSeconds = durationSeconds;
    }
}


class FormattedTravelData {
    formattedTime: string;
    formattedDistance: string;

    constructor(formattedTime: string, formattedDistance: string) {
        this.formattedTime = formattedTime;
        this.formattedDistance = formattedDistance;
    }
}


const sampleResponse = {
    "routes": [
        {
            "distanceMeters": 121556,
            "duration": "5535s"
        }
    ]
}


export function getTravelData(from: string, to: string, mode: TravelMode): FormattedTravelData {
    const rawTravelData = makeApiCall(from, to, mode);
    const formattedTime = computeTimeString(rawTravelData.durationSeconds);
    const distanceString = computeDistanceString(rawTravelData.distanceMeters);
    return new FormattedTravelData(formattedTime, distanceString);
}


function makeApiCall(from: string, to: string, mode: TravelMode): RawTravelData {
    const raw = sampleResponse.routes[0];
    const distanceMeters = raw.distanceMeters;
    const durationSeconds = parseInt(raw.duration.replace(/s$/, ""));
    return new RawTravelData(distanceMeters, durationSeconds);
}


function computeDistanceString(meters_total: number): string {
    let formattedDistance: string;
    if (meters_total < 1000) {
        formattedDistance = `${meters_total} Meter`;
    }
    else {
        const kilometers = Math.floor(meters_total / 1000);
        const meters = meters_total % 1000;
        formattedDistance = `${kilometers} Kilometer ${meters} Meter`;
    }
    return formattedDistance
}


function computeTimeString(seconds_total: number): string {
    let formattedTime: string;
    if (seconds_total < 60) {
        formattedTime = `${seconds_total} Sekunden`;
    }
    else if (seconds_total < 3600) {
        const minutes = Math.floor(seconds_total / 60);
        const seconds = seconds_total % 60;
        formattedTime = `${minutes} Minuten ${seconds} Sekunden`;
    }
    else {
        const hours = Math.floor(seconds_total / 3600);
        const minutes = Math.floor((seconds_total / 60) - (hours * 60));
        const seconds = seconds_total % 60;
        formattedTime = `${hours} Stunden ${minutes} Minuten ${seconds} Sekunden`;
    }
    return formattedTime
}
