import { getTravelInfo } from "../api/google-maps-routes-api";
import { TravelMode } from "../models/travel-mode-file";


const ComparisonTable = () => {
    const car_info = getTravelInfo("Bern", "Zürich", TravelMode.DRIVE);
    const public_transport_info = getTravelInfo("Bern", "Zürich", TravelMode.TRANSIT);
    const bike_info = getTravelInfo("Bern", "Zürich", TravelMode.BICYCLE);
    const walk_info = getTravelInfo("Bern", "Zürich", TravelMode.WALK);
    const two_wheeler_info = getTravelInfo("Bern", "Zürich", TravelMode.TWO_WHEELER);

    return <table>
        <th>Resultate</th>
        <tr>
            <td>Verkehrsmittel</td>
            <td>Distanz</td>
            <td>Zeit</td>
        </tr>
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
    </table>;
};

export default ComparisonTable;
