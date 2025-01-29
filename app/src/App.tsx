import React from 'react';
import { Title } from './components/sub-components/Title';
import { MessageDisplay } from "./components/MessageDisplay";
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title as ChartTitle, Tooltip } from 'chart.js';
import { Formular } from "./components/Formular";
import { Comparison } from "./components/Comparison";
import './App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip);

function App() {

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "1000px", margin: "auto" }}>
            <Title />
            <MessageDisplay />
            <Formular />
            <Comparison />
        </div>
    );
}

export default App;
