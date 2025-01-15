import { AllTravelData } from "../api/google-maps-routes-api";


const means_to_title: Record<string, string> = {
    drive: "Auto",
    bicycle: "Fahrrad",
    walk: "Zu Fuss",
    two_wheeler: "Motorrad",
    transit: "Öffentliche Verkehrsmittel",
}


interface ComparisonTableProps {
    all_travel_data: AllTravelData | null;
}


const ComparisonTable: React.FC<ComparisonTableProps> = ({all_travel_data}) => {
    if (!all_travel_data) {
        return null;
    }
    const all_means = Object.keys(all_travel_data);
    const all_values = Object.values(all_travel_data);
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
                {all_means.map((means, index) => {
                    if(all_values[index] === undefined) {
                        return null
                    } else {
                        return <tr key={means}>
                            <td>{means_to_title[means]}</td>
                            <td>{all_values[index].formattedDistance}</td>
                            <td>{all_values[index].formattedTime}</td>
                        </tr>
                }})}
            </tbody>
        </table>
    );
};

export default ComparisonTable;
