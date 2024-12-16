import { getTravelInfo } from "../api/google-maps-routes-api";
import { TravelMode } from "../models/travel-mode";


const ComparisonTable = () => {
    const car_info = getTravelInfo("Bern", "Zürich", TravelMode.DRIVE);
    const public_transport_info = getTravelInfo("Bern", "Zürich", TravelMode.TRANSIT);
    const bike_info = getTravelInfo("Bern", "Zürich", TravelMode.BICYCLE);
    const walk_info = getTravelInfo("Bern", "Zürich", TravelMode.WALK);
    const two_wheeler_info = getTravelInfo("Bern", "Zürich", TravelMode.TWO_WHEELER);

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
                <td>{car_info.formattedDistance}</td>
                <td>{car_info.formattedTime}</td>
            </tr>
            <tr>
                <td>Öffentliche Verkehrsmittel</td>
                <td>{public_transport_info.formattedDistance}</td>
                <td>{public_transport_info.formattedTime}</td>
            </tr>
            <tr>
                <td>Velo</td>
                <td>{bike_info.formattedDistance}</td>
                <td>{bike_info.formattedTime}</td>
            </tr>
            <tr>
                <td>Fussgänger</td>
                <td>{walk_info.formattedDistance}</td>
                <td>{walk_info.formattedTime}</td>
            </tr>
            <tr>
                <td>Motorrad</td>
                <td>{two_wheeler_info.formattedDistance}</td>
                <td>{two_wheeler_info.formattedTime}</td>
            </tr>
        </tbody>
    </table>;
};

export default ComparisonTable;
