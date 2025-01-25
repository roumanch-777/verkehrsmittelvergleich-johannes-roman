import { Bar } from 'react-chartjs-2';
import { AllTravelDataUnformatted } from '../utils/googleMapsAPI';
import { computeTimeString, computeDistanceString } from "../utils/stringFormatters";


const computeDurationAxis = (value: number | string) => {
    if (typeof value === "string") return value;
    if (value > 86400) { // 1 day
        // round on 0.5 d precision: round the double of the value and divide by 2
        return `${Math.floor(value / (86400 / 2)) / 2} d`;
    } else if (value > 36_000) { // 10 hours
        // round on 1 hour precision: round the number
        return `${Math.round(value / 3600)} h`;
    } else if (value > 3600) { // 1 hour
        // round on 30 min precision: round the double of the value and divide by 2
        return `${Math.round(value / (3600 / 2)) / 2} h`;
    } else if (value > 60) { // 1 min
        // round on 5 min precision: round the 5th of the value and multiply by 5
        return `${Math.round(value / (60 * 5)) * 5} min`;
    } else {
        return "0 min";
    }
};


const computeDistanceAxis = (value: number | string) => {
    if (typeof value === "string") return value;
    if (value > 100_000) { // 100 km
        // round on 50 km precision: round the 50th of the value and multiply by 50
        return `${Math.round(value / (1000 * 50)) * 50} km`;
    } else if (value > 1000) { // 1 km
        // round on 0.5 km precision: round the double of the value and divide by 2
        return `${Math.round(value / (1000 / 2)) / 2} km`;
    } else {
        return `${value} m`;
    }
}


export enum LabelType {
    DURATION = "DURATION",
    DISTANCE = "DISTANCE",
}


interface LabeledDiagramDataProps {
    drive?: number
    bicycle?: number
    walk?: number
    twoWheeler?: number
    transit?: number
}


const labelMapper: Map<string, string> = new Map([
    ["drive", "Auto"],
    ["bicycle", "Velo"],
    ["walk", "Zu Fuss"],
    ["twoWheeler", "Motorrad"],
    ["transit", "ÖV"],
]);


const computeLabeledData = (
    allTravelDataUnformatted: AllTravelDataUnformatted,
    label: LabelType,
): LabeledDiagramDataProps => {
    let result: LabeledDiagramDataProps = {};
    switch (label) {
        case LabelType.DURATION:
            result = {
                drive: allTravelDataUnformatted.driveRaw?.durationSeconds || 0,
                bicycle: allTravelDataUnformatted.bicycleRaw?.durationSeconds || 0,
                walk: allTravelDataUnformatted.walkRaw?.durationSeconds || 0,
                twoWheeler: allTravelDataUnformatted.twoWheelerRaw?.durationSeconds || 0,
                transit: allTravelDataUnformatted.transitRaw?.durationSeconds || 0,
            };
            break;
        case LabelType.DISTANCE:
            result = {
                drive: allTravelDataUnformatted.driveRaw?.distanceMeters || 0,
                bicycle: allTravelDataUnformatted.bicycleRaw?.distanceMeters || 0,
                walk: allTravelDataUnformatted.walkRaw?.distanceMeters || 0,
                twoWheeler: allTravelDataUnformatted.twoWheelerRaw?.distanceMeters || 0,
                transit: allTravelDataUnformatted.transitRaw?.distanceMeters || 0,
            };
            break;
        default:
            throw new Error("Invalid label type: Label must be either DURATION or DISTANCE");
    }
    // Filter out fields with value `0`
    const filteredResult = Object.fromEntries(
        Object.entries(result).filter(([_, value]) => value !== 0)
    );
    return filteredResult;
}


const computeChartOptions = (label: LabelType): any => {
    return {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    // Customize the label of the tooltip (Y-axis value)
                    label: (tooltipItem: any) => {
                        const value = tooltipItem.parsed.y;
                        return `${label === LabelType.DURATION ? computeTimeString(value) : computeDistanceString(value)}`;
                    },
                },
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: label === LabelType.DURATION ? computeDurationAxis : computeDistanceAxis,
                    maxTicksLimit: 6,
                },
            },
        },
    };
};


interface DiagramDataProps {
    allTravelDataUnformatted: AllTravelDataUnformatted | null;
    label: LabelType;
}


export const Diagram: React.FC<DiagramDataProps> = ({ allTravelDataUnformatted, label }) => {
    if (!allTravelDataUnformatted) {
        return null;
    }
    const labelStr = label === LabelType.DURATION ? "Dauer" : "Distanz";
    const labeledData = computeLabeledData(allTravelDataUnformatted, label);
    const formattedDiagramData = {
        labels: Object.keys(labeledData).map((value) => labelMapper.get(value) || ""),
        datasets: [
            {
                label: labelStr,
                data: Object.values(labeledData),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };
    const options = computeChartOptions(label);
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{labelStr}</h2>
            <Bar
                data={formattedDiagramData}
                options={options}
            />
        </div>
    );
};
