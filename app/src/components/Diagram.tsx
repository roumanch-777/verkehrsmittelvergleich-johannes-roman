import { Bar } from 'react-chartjs-2';
import { FormattedTravelData } from '../api/google-maps-routes-api';

export class DiagramData {
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


interface DiagramDataProps {
    diagramData: DiagramData | null;
}


const Diagram: React.FC<DiagramDataProps> = ({ diagramData }) => {
    if(!diagramData) {
        return null;
    }
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
