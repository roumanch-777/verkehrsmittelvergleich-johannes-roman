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


class FormattedTravelData {
    formattedTime: string;
    formattedDistance: string;

    constructor(formattedTime: string, formattedDistance: string) {
        this.formattedTime = formattedTime;
        this.formattedDistance = formattedDistance;
    }
}


export class AllTravelData {
    drive: FormattedTravelData
    bicycle: FormattedTravelData
    walk: FormattedTravelData
    two_wheeler: FormattedTravelData
    transit: FormattedTravelData

    constructor(
        drive: FormattedTravelData,
        bicycle: FormattedTravelData,
        walk: FormattedTravelData,
        two_wheeler: FormattedTravelData,
        transit: FormattedTravelData,
    ) {
        this.drive = drive;
        this.bicycle = bicycle;
        this.walk = walk;
        this.two_wheeler= two_wheeler;
        this.transit = transit;
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


function getTravelData(from: string, to: string, mode: TravelMode): FormattedTravelData {
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
    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    });
    if(!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    const result = new ApiResponse(data.routes[0].distanceMeters, data.routes[0].duration);
    return result;  // problem: this line is reached before the response arrives
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
