import { TravelMode } from "../models/travel-mode";


const USE_REAL_API = false;
const API_KEY = ensure_string(process.env.REACT_APP_API_KEY);
const REFERER = ensure_string(process.env.REACT_APP_REFERER);


function ensure_string(str: string | undefined | void): string {
    if (!str) {
        throw new Error(`Not a valid string: ${str}`);
    }
    return str;
}


class RawTravelData {
    durationSeconds: number;
    distanceMeters: number;

    constructor(distanceMeters: number, durationSeconds: number) {
        this.distanceMeters = distanceMeters;
        this.durationSeconds = durationSeconds;
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


export function getTravelData(from: string, to: string, mode: TravelMode): void {
    getRawData(from, to, mode).then(rawTravelData => {
        const formattedTime = computeTimeString(rawTravelData.durationSeconds);
        const distanceString = computeDistanceString(rawTravelData.distanceMeters);
        console.log(`${mode}:\t\t${distanceString} \t\t${formattedTime}`);
    });
}


function getRawData(from: string, to: string, mode: TravelMode): Promise<RawTravelData> {
    if (USE_REAL_API) {
        makeApiCall(from, to, mode).then(raw => {
            return new RawTravelData(raw.distanceMeters, parseInt(raw.duration.replace(/s$/, "")));           
        });
    } else {
        return new RawTravelData(sampleResponse.distanceMeters, parseInt(sampleResponse.duration.replace(/s$/, "")));
    }
}


async function makeApiCall(from: string, to: string, mode: TravelMode): Promise<ApiResponse> {
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
        "X-Goog-Api-Key": API_KEY,
        "Referer": REFERER,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
    };
    const response = fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    }).then(response => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    }).then(data => {
        return new ApiResponse(data.routes[0].distanceMeters, data.routes[0].duration);
    }).catch(err => console.warn(err));
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
