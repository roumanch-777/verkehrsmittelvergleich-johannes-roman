import {TravelMode} from "../models/travel-mode";


const USE_REAL_API = false;
const API_KEY = ensure_string(process.env.REACT_APP_API_KEY);


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
    drive: FormattedTravelData | undefined
    bicycle: FormattedTravelData | undefined
    walk: FormattedTravelData | undefined
    two_wheeler: FormattedTravelData | undefined
    transit: FormattedTravelData | undefined

    constructor(
        drive: FormattedTravelData | undefined,
        bicycle: FormattedTravelData | undefined,
        walk: FormattedTravelData | undefined,
        two_wheeler: FormattedTravelData | undefined,
        transit: FormattedTravelData | undefined,
    ) {
        this.drive = drive;
        this.bicycle = bicycle;
        this.walk = walk;
        this.two_wheeler = two_wheeler;
        this.transit = transit;
    }

}


interface Payload {
    "origin": {"address": string},
    "destination": {"address": string},
    "travelMode": TravelMode,
    "languageCode": string,
    "routingPreference"?: string,
    "departureTime"?: string,
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


export async function getAllTravelData(from: string, to: string, departureTime: Date | null, setAllTravelData: (data: AllTravelData) => void): Promise<void> {
    const drive = await getTravelData(from, to, departureTime, TravelMode.DRIVE);
    const bicycle = await getTravelData(from, to, departureTime, TravelMode.BICYCLE);
    const walk = await getTravelData(from, to, departureTime, TravelMode.WALK);
    const two_wheeler = await getTravelData(from, to, departureTime, TravelMode.TWO_WHEELER);
    const transit = await getTravelData(from, to, departureTime, TravelMode.TRANSIT);
    setAllTravelData(new AllTravelData(drive, bicycle, walk, two_wheeler, transit));
    //setDiagramData(new AllTravelData(drive, bicycle, walk, two_wheeler, transit));
}


async function getTravelData(from: string, to: string, departureTime: Date | null, mode: TravelMode): Promise<FormattedTravelData | undefined> {
    const rawTravelData = await getRawData(from, to, departureTime, mode);
    if(!rawTravelData) {
        return;
    }
    const formattedTime = computeTimeString(rawTravelData.durationSeconds);
    const distanceString = computeDistanceString(rawTravelData.distanceMeters);
    return new FormattedTravelData(formattedTime, distanceString);
}


async function getRawData(from: string, to: string, departureTime: Date | null, mode: TravelMode): Promise<RawTravelData | undefined> {
    let raw: ApiResponse | undefined;
    if (USE_REAL_API) {
        raw = await makeApiCall(from, to, departureTime, mode);
        if(!raw) {
            return;
        }
    } else {
        raw = sampleResponse;
    }
    const distanceMeters = raw.distanceMeters;
    const durationSeconds = parseInt(raw.duration.replace(/s$/, ""));
    return new RawTravelData(distanceMeters, durationSeconds);
}


async function makeApiCall(from: string, to: string, departureTime: Date | null, mode: TravelMode): Promise<ApiResponse | undefined> {
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes"
    const payload: Payload = {
        "origin": {"address": from},
        "destination": {"address": to},
        "travelMode": mode,
        "languageCode": "de-CH",
    };
    if(departureTime && departureTime > new Date()) {
        payload["departureTime"] = departureTime.toISOString();
    };
    if(mode !== TravelMode.WALK && mode !== TravelMode.BICYCLE && mode !== TravelMode.TRANSIT) {
        payload["routingPreference"] = "TRAFFIC_AWARE";
    };
    const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
    };
    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    });
    if(!response.ok) throw new Error();
    const data = await response.json();
    if(data && "routes" in data && data["routes"].length > 0) {
        console.log(`Received a route for mode ${mode.valueOf()} (from '${from}' to '${to}')`);
        return new ApiResponse(data.routes[0].distanceMeters, data.routes[0].duration);
    } else {
        console.log(`No route found for mode ${mode.valueOf()} (from '${from}' to '${to}')`);
        return;
    }
}


function computeDistanceString(meters_total: number): string {
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


function computeTimeString(seconds_total: number): string {
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
