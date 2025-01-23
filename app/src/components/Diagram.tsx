import { Bar } from 'react-chartjs-2';
import { AllTravelDataUnformatted } from '../api/google-maps-routes-api';


const duration_axis_converter = (value: number | string) => {
    if (typeof value === "string") return value;
    if (value > 86400) { // 1 day
        // round on 0.5 d precision: round the double of the value and divide by 2
        return `${Math.floor(value / (86400 / 2)) / 2} d`;
    } else if (value > 3600) { // 1 hour
        // round on 30 min precision: round the double of the value and divide by 2
        return `${Math.round(value / (3600 / 2)) / 2} h`;
    } else if (value > 60) { // 1 min
        // round on 10 min precision: round the 10th of the value and multiply by 10
        return `${Math.round(value / (60 * 10)) * 10} min`;
    } else {
        return `${value} s`;
    }
};


const time_axis_converter = (value: number | string) => {
    if (typeof value === "string") return value;
    if (value > 100000) { // 100 km
        // round on 50 km precision: round the double of the value and divide by 2
        return `${Math.floor(value / (100000 / 2)) / 2} km`;
    } else if (value > 1000) { // 1 km
        // round on 500 m precision: round the double of the value and divide by 2
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


const Diagram: React.FC<DiagramDataProps> = ({ diagramData, label }) => {
    if (!diagramData) {
        return null;
    }
    const label_str = label === LabelType.DURATION ? "Dauer" : "Distanz";
    const data = label === LabelType.DURATION ?
        [
            diagramData.drive_raw?.durationSeconds || 0,
            diagramData.bicycle_raw?.durationSeconds || 0,
            diagramData.walk_raw?.durationSeconds || 0,
            diagramData.two_wheeler_raw?.durationSeconds || 0,
            diagramData.transit_raw?.durationSeconds || 0,
        ]
        :
        [
            diagramData.drive_raw?.distanceMeters || 0,
            diagramData.bicycle_raw?.distanceMeters || 0,
            diagramData.walk_raw?.distanceMeters || 0,
            diagramData.two_wheeler_raw?.distanceMeters || 0,
            diagramData.transit_raw?.distanceMeters || 0,
        ];
    const formattedDiagramData: DiagramData = {
        labels: ["Auto", "Fahrrad", "Zu Fuß", "Motorrad", "Öffentliche Verkehrsmittel"],
        datasets: [
            {
                label: label_str,
                data: data,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{label_str}</h2>
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
                                callback: label === LabelType.DURATION ? duration_axis_converter : time_axis_converter,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default Diagram;
