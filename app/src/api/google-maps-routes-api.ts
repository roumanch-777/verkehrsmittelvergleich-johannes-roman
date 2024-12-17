import { TravelMode } from "../models/travel-mode";


const USE_REAL_API = false;


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


class ApiResponse {
    "distanceMeters": number
    "duration": string

    constructor(distanceMeters: number, duration: string) {
        this.distanceMeters = distanceMeters;
        this.duration = duration;
    }
}


const sampleResponse = new ApiResponse(121556, "5535s")


export function getTravelData(from: string, to: string, mode: TravelMode): FormattedTravelData {
    const rawTravelData = getRawData(from, to, mode);
    const formattedTime = computeTimeString(rawTravelData.durationSeconds);
    const distanceString = computeDistanceString(rawTravelData.distanceMeters);
    return new FormattedTravelData(formattedTime, distanceString);
}


function getRawData(from: string, to: string, mode: TravelMode): RawTravelData {
    let raw: ApiResponse;
    if (USE_REAL_API) {
        raw = makeApiCall(from, to, mode);
    } else {
        raw = sampleResponse;
    }
    const distanceMeters = raw.distanceMeters;
    const durationSeconds = parseInt(raw.duration.replace(/s$/, ""));
    return new RawTravelData(distanceMeters, durationSeconds);
}


function makeApiCall(from: string, to: string, mode: TravelMode): ApiResponse {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) {
        throw new Error("No API key found");
    }
    const referer = process.env.REACT_APP_REFERER;
    if (!referer) {
        throw new Error("No referer found");
    }
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes"
    const payload = {
        "origin": {"address": from},
        "destination": {"address": to},
        "travelMode": "TRANSIT",
        "routingPreference": "TRAFFIC_AWARE",
        "departureTime": new Date().toISOString(),
        "languageCode": "de-CH",
    };
    const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "Referer": referer,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
    };
    const response = fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        return new ApiResponse(data.routes[0].distanceMeters, data.routes[0].duration);
    });
    return response;
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
