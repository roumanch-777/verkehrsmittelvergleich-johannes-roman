import React, {useEffect, useState} from 'react';
import Title from "./components/Title";
import ComparisonTable from './components/ComparisonTable';
import InputField from './components/InputField'
import Button from './components/Button'
import DatumPicker from "./components/DatumPicker";
import {formValidationHandler} from "./utils/formValidationHandler";
import ErrorDisplay from "./components/ErrorDisplay";
import EventBus from "./utils/EventBus";
import Messages from "./events/messages";
import {AllTravelData, getAllTravelData} from './api/google-maps-routes-api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip } from 'chart.js';
import Diagram from './components/Diagram';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip);

function App() {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureTime, setDepartureTime] = useState<Date | null>(new Date());
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {validateForm} = formValidationHandler();

    useEffect(() => {

        const errorSubscriber = (message: string) => {
            setErrorMessage(message);
        };

        const successSubscriber = (message: string) => {
            setErrorMessage(null);
            console.log(message);
        };

        EventBus.subscribe(Messages.FORM_ERROR, errorSubscriber);
        EventBus.subscribe(Messages.FORM_SUBMITTED, successSubscriber);

        return () => {
            EventBus.unsubscribe(Messages.FORM_ERROR, errorSubscriber);
            EventBus.unsubscribe(Messages.FORM_SUBMITTED, successSubscriber);
        };
    }, []);

    const [allTravelData, setAllTravelData] = useState<AllTravelData | null>(null);
    const [diagramData, setDiagramData] = useState<AllTravelData | null>(null);

    const handleSubmit = () => {
        const isValid = validateForm(from, to, departureTime);

        if (!isValid) {
            return;
        }

        const requestData = {from, to, departureTime};
        console.log("Formulardaten erfolgreich veröffentlicht:", requestData);
        getAllTravelData(from, to, departureTime, setAllTravelData, setDiagramData);

    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px", margin: "auto"}}>
            <Title/>
            <ErrorDisplay/>
            <InputField label="Von" value={from} onChange={setFrom}/>
            <DatumPicker label="Abfahrt" value={departureTime} onChange={setDepartureTime}/>
            <InputField label="Bis" value={to} onChange={setTo}/>
            <Button onClick={handleSubmit}>Absenden</Button>
            <ComparisonTable all_travel_data={allTravelData}/>
            <Diagram diagramData={diagramData} />
        </div>
    );
}

export default App;
