import { getTravelData } from "../api/google-maps-routes-api";
import { TravelMode } from "../models/travel-mode";


const ComparisonTable = () => {
    const car_data = getTravelData("Bern", "Zürich", TravelMode.DRIVE);
    const public_transport_data = getTravelData("Bern", "Zürich", TravelMode.TRANSIT);
    const bike_data = getTravelData("Bern", "Zürich", TravelMode.BICYCLE);
    const walk_data = getTravelData("Bern", "Zürich", TravelMode.WALK);
    const two_wheeler_data = getTravelData("Bern", "Zürich", TravelMode.TWO_WHEELER);

    return <table>
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
                <td>{car_data.formattedDistance}</td>
                <td>{car_data.formattedTime}</td>
            </tr>
            <tr>
                <td>Öffentliche Verkehrsmittel</td>
                <td>{public_transport_data.formattedDistance}</td>
                <td>{public_transport_data.formattedTime}</td>
            </tr>
            <tr>
                <td>Velo</td>
                <td>{bike_data.formattedDistance}</td>
                <td>{bike_data.formattedTime}</td>
            </tr>
            <tr>
                <td>Fussgänger</td>
                <td>{walk_data.formattedDistance}</td>
                <td>{walk_data.formattedTime}</td>
            </tr>
            <tr>
                <td>Motorrad</td>
                <td>{two_wheeler_data.formattedDistance}</td>
                <td>{two_wheeler_data.formattedTime}</td>
            </tr>
        </tbody>
    </table>;
};

export default ComparisonTable;
