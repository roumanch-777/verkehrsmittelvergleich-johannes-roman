import getTravelInfo from "../api/google-maps-routes-api";


const ComparisonTable = () => {
    const car_info = getTravelInfo("Bern", "Zürich", "car");
    const public_transport_info = getTravelInfo("Bern", "Zürich", "public_transport");
    const bike_info = getTravelInfo("Bern", "Zürich", "bike");
    
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
    </table>;
};

export default ComparisonTable;
