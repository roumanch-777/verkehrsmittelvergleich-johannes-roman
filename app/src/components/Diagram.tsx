import { Bar } from 'react-chartjs-2';
import { AllTravelData } from '../api/google-maps-routes-api';


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
    diagramData: AllTravelData | null;
    label: LabelType;
}


const Diagram: React.FC<DiagramDataProps> = ({ diagramData, label }) => {
    if(!diagramData) {
        return null;
    }
    const label_str = label === LabelType.DURATION ? "Dauer" : "Distanz";
    const data = label === LabelType.DURATION ? 
        [
            diagramData.drive?.formattedTime ? parseInt(diagramData.drive.formattedTime) : 0,
            diagramData.bicycle?.formattedTime ? parseInt(diagramData.bicycle.formattedTime) : 0,
            diagramData.walk?.formattedTime ? parseInt(diagramData.walk.formattedTime) : 0,
            diagramData.two_wheeler?.formattedTime ? parseInt(diagramData.two_wheeler.formattedTime) : 0,
            diagramData.transit?.formattedTime ? parseInt(diagramData.transit.formattedTime) : 0,
        ]
    :
        [
            diagramData.drive?.formattedDistance ? parseInt(diagramData.drive.formattedDistance) : 0,
            diagramData.bicycle?.formattedDistance ? parseInt(diagramData.bicycle.formattedDistance) : 0,
            diagramData.walk?.formattedDistance ? parseInt(diagramData.walk.formattedDistance) : 0,
            diagramData.two_wheeler?.formattedDistance ? parseInt(diagramData.two_wheeler.formattedDistance) : 0,
            diagramData.transit?.formattedDistance ? parseInt(diagramData.transit.formattedDistance) : 0,
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
            <h2 style={{ textAlign: "center" }}>Balkendiagramm</h2>
            <Bar 
                data={formattedDiagramData} 
                options={{
                    plugins: {
                    title: {
                        display: true,
                        text: "Datenübersicht",
                    },
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
