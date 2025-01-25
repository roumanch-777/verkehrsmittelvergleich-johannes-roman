import { Bar } from 'react-chartjs-2';
import { AllTravelDataUnformatted } from '../api/google-maps-routes-api';


const duration_axis_converter = (value: number | string) => {
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


const distance_axis_converter = (value: number | string) => {
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

interface DiagramData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
    }[];
}


interface DiagramDataProps {
    diagramData: AllTravelDataUnformatted | null;
    label: LabelType;
}


interface LabeledDiagramDataProps {
    drive?: number
    bicycle?: number
    walk?: number
    two_wheeler?: number
    transit?: number
}


const labelMapper: Map<string, string> = new Map([
    ["drive", "Auto"],
    ["bicycle", "Velo"],
    ["walk", "Zu Fuss"],
    ["two_wheeler", "Motorrad"],
    ["transit", "ÖV"],
]);


const compute_data_and_labels = (diagramDataProps: DiagramDataProps): LabeledDiagramDataProps => {
    let result: LabeledDiagramDataProps = {};
    switch (diagramDataProps.label) {
        case LabelType.DURATION:
            result = {
                drive: diagramDataProps.diagramData?.drive_raw?.durationSeconds || 0,
                bicycle: diagramDataProps.diagramData?.bicycle_raw?.durationSeconds || 0,
                walk: diagramDataProps.diagramData?.walk_raw?.durationSeconds || 0,
                two_wheeler: diagramDataProps.diagramData?.two_wheeler_raw?.durationSeconds || 0,
                transit: diagramDataProps.diagramData?.transit_raw?.durationSeconds || 0,
            };
            break;
        case LabelType.DISTANCE:
            result = {
                drive: diagramDataProps.diagramData?.drive_raw?.distanceMeters || 0,
                bicycle: diagramDataProps.diagramData?.bicycle_raw?.distanceMeters || 0,
                walk: diagramDataProps.diagramData?.walk_raw?.distanceMeters || 0,
                two_wheeler: diagramDataProps.diagramData?.two_wheeler_raw?.distanceMeters || 0,
                transit: diagramDataProps.diagramData?.transit_raw?.distanceMeters || 0,
            };
            break;
        default:
            throw new Error("Invalid label type");
    }
    // Filter out fields with value `0`
    const filteredResult = Object.fromEntries(
        Object.entries(result).filter(([_, value]) => value !== 0)
    );
    return filteredResult;
}


const Diagram: React.FC<DiagramDataProps> = ({ diagramData, label }) => {
    if (!diagramData) {
        return null;
    }
    const labelStr = label === LabelType.DURATION ? "Dauer" : "Distanz";
    const labeledData = compute_data_and_labels({ diagramData, label });
    const formattedDiagramData: DiagramData = {
        labels: Object.keys(labeledData).map((value) => labelMapper.get(value) || ""),
        datasets: [
            {
                label: labelStr,
                data: Object.values(labeledData),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{labelStr}</h2>
            <Bar
                data={formattedDiagramData}
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: label === LabelType.DURATION ? duration_axis_converter : distance_axis_converter,
                                maxTicksLimit: 6,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default Diagram;
