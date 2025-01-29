import React, {useEffect, useState} from "react";
import {ComparisonTable} from "./sub-components/ComparisonTable";
import {Diagram, LabelType} from "./sub-components/Diagram";
import {AllTravelData, AllTravelDataUnformatted} from "../models/apiModels";
import {eventBus} from "../utils/EventBus";
import {Messages} from "../models/messages";

export function Comparison() {

    const [allTravelData, setAllTravelData] = useState<AllTravelData | null>(null);
    const [diagramData, setDiagramData] = useState<AllTravelDataUnformatted | null>(null);

    useEffect(() => {

        const handleTravelDataReceived = (data: any) => {
            setAllTravelData(data);
        };

        const handleDiagramDataReceived = (data: any) => {
            setDiagramData(data);
        };

        eventBus.subscribe(Messages.TRAVELDATA_RECEIVED, handleTravelDataReceived);
        eventBus.subscribe(Messages.DIAGRAMDATA_RECEIVED, handleDiagramDataReceived);

        return () => {
            eventBus.unsubscribe(Messages.TRAVELDATA_RECEIVED, handleTravelDataReceived);
            eventBus.unsubscribe(Messages.DIAGRAMDATA_RECEIVED, handleDiagramDataReceived);
        };
    }, []);

    return (
        <div>
            <ComparisonTable allTravelData={allTravelData}/>
            <Diagram allTravelDataUnformatted={diagramData} label={LabelType.DURATION}/>
            <Diagram allTravelDataUnformatted={diagramData} label={LabelType.DISTANCE}/>
        </div>
    )
}