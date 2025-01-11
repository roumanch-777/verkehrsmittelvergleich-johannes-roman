import React, {useState} from 'react';
import Title from "./components/Title";
import ComparisonTable from './components/ComparisonTable';
import InputField from './components/InputField'
import Button from './components/Button'
import DatumPicker from "./components/DatumPicker";
import { AllTravelData, getAllTravelData } from './api/google-maps-routes-api';

function App() {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureTime, setDepartureTime] = useState<Date | null>(new Date());
    const [arrivalTime, setArrivalTime] = useState<Date | null>(null);

    const [allTravelData, setAllTravelData] = useState<AllTravelData | null>(null);

    const handleSubmit = () => {
        console.log("Von:", from);
        console.log("Nach:", to);
        console.log("Abfahrtszeit:", departureTime);
        console.log("Ankunftszeit:", arrivalTime);

        if (!from || !to || !departureTime || !arrivalTime) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        getAllTravelData(from, to, departureTime, arrivalTime, setAllTravelData);
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px", margin: "auto"}}>
            <Title/>
            <InputField label="Von" value={from} onChange={setFrom}/>
            <DatumPicker label="Abfahrt" value={departureTime} onChange={setDepartureTime}/>
            <InputField label="Bis" value={to} onChange={setTo}/>
            <DatumPicker label="Ankunft" value={arrivalTime} onChange={setArrivalTime}/>
            <Button onClick={handleSubmit}>Absenden</Button>
            <ComparisonTable all_travel_data={allTravelData}/>
        </div>
    );
}

export default App;
