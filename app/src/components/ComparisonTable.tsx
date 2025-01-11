import { AllTravelData } from "../api/google-maps-routes-api";


interface ComparisonTableProps {
    all_travel_data: AllTravelData | null;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({all_travel_data}) => {
    if (!all_travel_data) {
        return null;
    }
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
                <tr>
                    <td>Auto</td>
                    <td>{all_travel_data.drive.formattedDistance}</td>
                    <td>{all_travel_data.drive.formattedTime}</td>
                </tr>
                <tr>
                    <td>Öffentliche Verkehrsmittel</td>
                    <td>{all_travel_data.transit.formattedDistance}</td>
                    <td>{all_travel_data.transit.formattedTime}</td>
                </tr>
                <tr>
                    <td>Velo</td>
                    <td>{all_travel_data.bicycle.formattedDistance}</td>
                    <td>{all_travel_data.bicycle.formattedTime}</td>
                </tr>
                <tr>
                    <td>Fussgänger</td>
                    <td>{all_travel_data.walk.formattedDistance}</td>
                    <td>{all_travel_data.walk.formattedTime}</td>
                </tr>
                <tr>
                    <td>Motorrad</td>
                    <td>{all_travel_data.two_wheeler.formattedDistance}</td>
                    <td>{all_travel_data.two_wheeler.formattedTime}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default ComparisonTable;
