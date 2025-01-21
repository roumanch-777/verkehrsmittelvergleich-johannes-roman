import { Bar } from 'react-chartjs-2';
import { AllTravelData } from '../api/google-maps-routes-api';


interface DiagramData {}


interface DiagramDataProps {
    diagramData: AllTravelData | null;
}


const Diagram: React.FC<DiagramDataProps> = ({ diagramData }) => {
    if(!diagramData) {
        return null;
    }
    // {
    //     labels: ["Januar", "Februar", "März", "April", "Mai"],
    //     datasets: [
    //       {
    //         label: "Umsatz",
    //         data: [3000, 2000, 4000, 5000, 6000],
    //         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    //       },
    //     ],
    //   }
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Balkendiagramm</h2>
            <Bar 
                data={diagramData} 
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
