import { Bar } from 'react-chartjs-2';
import { AllTravelData } from '../api/google-maps-routes-api';


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
}


const Diagram: React.FC<DiagramDataProps> = ({ diagramData }) => {
    if(!diagramData) {
        return null;
    }
    const formattedDiagramData: DiagramData = {
        labels: ["Auto", "Fahrrad", "Zu Fuß", "Motorrad", "Öffentliche Verkehrsmittel"],
        datasets: [
            {
                label: "Dauer",
                data: [
                    diagramData.drive?.formattedTime ? parseInt(diagramData.drive.formattedTime) : 0,
                    diagramData.bicycle?.formattedTime ? parseInt(diagramData.bicycle.formattedTime) : 0,
                    diagramData.walk?.formattedTime ? parseInt(diagramData.walk.formattedTime) : 0,
                    diagramData.two_wheeler?.formattedTime ? parseInt(diagramData.two_wheeler.formattedTime) : 0,
                    diagramData.transit?.formattedTime ? parseInt(diagramData.transit.formattedTime) : 0,
                ],
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
