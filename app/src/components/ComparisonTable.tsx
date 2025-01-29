import { AllTravelData } from "../models/apiModels";


const meansToTitle: Record<string, string> = {
    drive: "🚗 Auto",
    bicycle: "🚴 Fahrrad",
    walk: "🚶‍♂️ Zu Fuss",
    twoWheeler: "🏍 Motorrad",
    transit: "🚆 Öffentliche Verkehrsmittel",
}


interface ComparisonTableProps {
    allTravelData: AllTravelData | null;
}


export const ComparisonTable: React.FC<ComparisonTableProps> = ({ allTravelData }) => {
    if (!allTravelData) {
        return null;
    }
    const allMeans = Object.keys(allTravelData);
    const allValues = Object.values(allTravelData);
    return (
        <table>
            <thead>
                <tr>
                    <th>Verkehrsmittel</th>
                    <th>Distanz</th>
                    <th>Zeit</th>
                </tr>
            </thead>
            <tbody>
                {allMeans.map((means, index) => {
                    if (allValues[index] === undefined) {
                        return null
                    } else {
                        return <tr key={means}>
                            <td>{meansToTitle[means]}</td>
                            <td>{allValues[index].formattedDistance}</td>
                            <td>{allValues[index].formattedTime}</td>
                        </tr>
                    }
                })}
            </tbody>
        </table>
    );
};
