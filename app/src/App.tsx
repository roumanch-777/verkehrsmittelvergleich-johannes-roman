import React, {useState} from 'react';
import Title from "./components/Title";
import ComparisonTable from './components/ComparisonTable';
import InputField from './components/InputField'
import Button from './components/Button'
import DatumPicker from "./components/DatumPicker";

function App() {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureTime, setDepartureTime] = useState<Date | null>(new Date());
    const [arrivalTime, setArrivalTime] = useState<Date | null>(null);

    const handleSubmit = () => {
        console.log("Von:", from);
        console.log("Nach:", to);
        console.log("Abfahrtszeit:", departureTime);
        console.log("Ankunftszeit:", arrivalTime);

        if (!from || !to || !departureTime || !arrivalTime) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        // Werte verarbeiten (z. B. an ein Backend senden)
        const requestData = {
            from,
            to,
            departureTime,
            arrivalTime,
        };

        console.log("Daten an Backend senden:", requestData);
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px", margin: "auto"}}>
            <Title/>
            <InputField label="Von" value={from} onChange={setFrom}/>
            <DatumPicker label="Abfahrt" value={departureTime} onChange={setDepartureTime}/>
            <InputField label="Bis" value={to} onChange={setTo}/>
            <DatumPicker label="Ankunft" value={arrivalTime} onChange={setArrivalTime}/>
            <Button onClick={handleSubmit}>Absenden</Button>
            <ComparisonTable all_travel_data={}/>
        </div>
    );
}

export default App;
