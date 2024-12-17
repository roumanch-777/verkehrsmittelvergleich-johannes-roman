import React from 'react';
import Title from "./components/Title";
import ComparisonTable from './components/ComparisonTable';
import InputField from './components/InputField'
import Button from './components/Button'

function App() {
    return (
        <div>
            <Title/>
            <InputField>Von</InputField>
            <InputField>Bis</InputField>
            <Button>Absenden</Button>
            <ComparisonTable/>
        </div>
    );
}

export default App;
