import {
    ApiResponse,
    FormattedTravelData,
    Payload,
    RawTravelData,
    TravelMode
} from "../models/apiModels";
import { computeTimeString, computeDistanceString } from "./stringFormatters";
import { eventBus } from "./EventBus";
import { Messages } from "../models/messages";


const USE_REAL_API = false;
const API_KEY = ensureString(process.env.REACT_APP_API_KEY);


function ensureString(str: string | undefined | void): string {
    if (!str) {
        throw new Error(`Not a valid string: ${str}`);
    }
    return str;
}


const sampleResponse = new ApiResponse(121556, "5535s")


export async function getAllTravelData(
    from: string,
    to: string,
    departureTime: Date | null,
): Promise<void> {
    const [drive, driveRaw] = await getTravelData(from, to, departureTime, TravelMode.DRIVE);
    const [bicycle, bicycleRaw] = await getTravelData(from, to, departureTime, TravelMode.BICYCLE);
    const [walk, walkRaw] = await getTravelData(from, to, departureTime, TravelMode.WALK);
    const [twoWheeler, twoWheelerRaw] = await getTravelData(from, to, departureTime, TravelMode.TWO_WHEELER);
    const [transit, transitRaw] = await getTravelData(from, to, departureTime, TravelMode.TRANSIT);
    const allTravelData = { drive, bicycle, walk, twoWheeler, transit }
    const diagramData = {
        driveRaw: driveRaw,
        bicycleRaw: bicycleRaw,
        walkRaw: walkRaw,
        twoWheelerRaw: twoWheelerRaw,
        transitRaw: transitRaw
    }
    eventBus.publish(Messages.TRAVELDATA_RECEIVED, allTravelData);
    eventBus.publish(Messages.DIAGRAMDATA_RECEIVED, diagramData);
}


async function getTravelData(
    from: string,
    to: string,
    departureTime: Date | null,
    mode: TravelMode
): Promise<[FormattedTravelData | undefined, RawTravelData | undefined]> {
    const rawTravelData = await getRawData(from, to, departureTime, mode);
    if (!rawTravelData) {
        return [undefined, undefined];
    }
    const formattedTime = computeTimeString(rawTravelData.durationSeconds);
    const formattedDistance = computeDistanceString(rawTravelData.distanceMeters);
    return [{ formattedTime, formattedDistance }, rawTravelData];
}


async function getRawData(
    from: string,
    to: string,
    departureTime: Date | null,
    mode: TravelMode
): Promise<RawTravelData | undefined> {
    let raw: ApiResponse | undefined;
    if (USE_REAL_API) {
        raw = await makeApiCall(from, to, departureTime, mode);
        if (!raw) {
            return;
        }
    } else {
        raw = sampleResponse;
    }
    const distanceMeters = raw.distanceMeters;
    const durationSeconds = parseInt(raw.duration.replace(/s$/, ""));
    return { distanceMeters, durationSeconds };
}


async function makeApiCall(
    from: string,
    to: string,
    departureTime: Date | null,
    mode: TravelMode
): Promise<ApiResponse | undefined> {
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes"
    const payload: Payload = {
        "origin": { "address": from },
        "destination": { "address": to },
        "travelMode": mode,
        "languageCode": "de-CH",
    };
    if (departureTime && departureTime > new Date()) {
        payload["departureTime"] = departureTime.toISOString();
    };
    if (mode !== TravelMode.WALK && mode !== TravelMode.BICYCLE && mode !== TravelMode.TRANSIT) {
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
    if (!response.ok) throw new Error();
    const data = await response.json();
    if (data && "routes" in data && data["routes"].length > 0) {
        console.log(`Received a route for mode ${mode.valueOf()} (from '${from}' to '${to}')`);
        return new ApiResponse(data.routes[0].distanceMeters, data.routes[0].duration);
    } else {
        console.log(`No route found for mode ${mode.valueOf()} (from '${from}' to '${to}')`);
        return;
    }
}
