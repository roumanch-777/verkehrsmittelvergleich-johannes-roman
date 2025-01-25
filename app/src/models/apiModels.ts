export enum TravelMode {
    DRIVE = "DRIVE",
    BICYCLE = "BICYCLE",
    WALK = "WALK",
    TWO_WHEELER = "TWO_WHEELER",
    TRANSIT = "TRANSIT",
}


export interface RawTravelData {
    durationSeconds: number
    distanceMeters: number
}


export interface FormattedTravelData {
    formattedTime: string
    formattedDistance: string
}


export interface AllTravelData {
    drive: FormattedTravelData | undefined
    bicycle: FormattedTravelData | undefined
    walk: FormattedTravelData | undefined
    twoWheeler: FormattedTravelData | undefined
    transit: FormattedTravelData | undefined
}


export interface AllTravelDataUnformatted {
    driveRaw: RawTravelData | undefined
    bicycleRaw: RawTravelData | undefined
    walkRaw: RawTravelData | undefined
    twoWheelerRaw: RawTravelData | undefined
    transitRaw: RawTravelData | undefined
}


export interface Payload {
    "origin": { "address": string },
    "destination": { "address": string },
    "travelMode": TravelMode,
    "languageCode": string,
    "routingPreference"?: string,
    "departureTime"?: string,
}


export class ApiResponse {
    "distanceMeters": number
    "duration": string

    constructor(distanceMeters: number, duration: string) {
        this.distanceMeters = distanceMeters;
        this.duration = duration;
    }
}
