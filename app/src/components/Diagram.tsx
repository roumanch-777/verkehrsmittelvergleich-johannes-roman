import { Bar } from 'react-chartjs-2';
import { AllTravelDataUnformatted } from '../api/google-maps-routes-api';


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
    if(!diagramData) {
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
                }} 
            />
        </div>
    );
};

export default Diagram;
