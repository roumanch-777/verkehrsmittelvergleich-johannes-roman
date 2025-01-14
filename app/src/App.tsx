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

function App() {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureTime, setDepartureTime] = useState<Date | null>(new Date());
    const [arrivalTime, setArrivalTime] = useState<Date | null>(null);
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

    const handleSubmit = () => {
        const isValid = validateForm(from, to, departureTime, arrivalTime);

        if (!isValid) {
            return;
        }

        const requestData = {from, to, departureTime, arrivalTime};
        console.log("Formulardaten erfolgreich veröffentlicht:", requestData);
        // ab hier BackEnd-Abfrage
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px", margin: "auto"}}>
            <Title/>
            <ErrorDisplay/>
            <InputField label="Von" value={from} onChange={setFrom}/>
            <DatumPicker label="Abfahrt" value={departureTime} onChange={setDepartureTime}/>
            <InputField label="Bis" value={to} onChange={setTo}/>
            <DatumPicker label="Ankunft" value={arrivalTime} onChange={setArrivalTime}/>
            <Button onClick={handleSubmit}>Absenden</Button>
            <ComparisonTable/>
        </div>
    );
}

export default App;
