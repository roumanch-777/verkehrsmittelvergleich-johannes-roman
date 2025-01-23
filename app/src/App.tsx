import React, {useState} from 'react';
import Title from "./components/Title";
import ComparisonTable from './components/ComparisonTable';
import InputField from './components/InputField'
import Button from './components/Button'
import DatumPicker from "./components/DatumPicker";
import {formValidationHandler} from "./utils/formValidationHandler";
import MessageDisplay from "./components/MessageDisplay";
import {AllTravelData, AllTravelDataUnformatted, getAllTravelData} from './api/google-maps-routes-api';
import EventBus from "./utils/EventBus";
import Messages from "./events/messages";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip } from 'chart.js';
import Diagram, {LabelType} from './components/Diagram';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip);


function App() {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureTime, setDepartureTime] = useState<Date | null>(new Date());
    const {validateForm} = formValidationHandler();

    const [allTravelData, setAllTravelData] = useState<AllTravelData | null>(null);
    const [diagramData, setDiagramData] = useState<AllTravelDataUnformatted | null>(null);

    const handleSubmit = () => {
        const isValid = validateForm(from, to, departureTime);

        if (!isValid) {
            return;
        }

        const requestData = {from, to, departureTime};
        console.log("Formulardaten erfolgreich veröffentlicht:", requestData);
        EventBus.publish(Messages.FORM_SUBMITTED, "Formular erfolgreich gesendet!");
        getAllTravelData(from, to, departureTime, setAllTravelData, setDiagramData);

    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px", margin: "auto"}}>
            <Title/>
            <MessageDisplay/>
            <InputField label="Abfahrtsort" value={from} onChange={setFrom}/>
            <DatumPicker label="Abfahrtszeit" value={departureTime} onChange={setDepartureTime}/>
            <InputField label="Zielort" value={to} onChange={setTo}/>
            <Button onClick={handleSubmit}>Absenden</Button>
            <ComparisonTable all_travel_data={allTravelData}/>
            <Diagram diagramData={diagramData} label={LabelType.DURATION}/>
            <Diagram diagramData={diagramData} label={LabelType.DISTANCE}/>
        </div>
    );
}

export default App;
