import EventBus from "./EventBus";
import Messages from "../events/messages";

export const formValidationHandler = () => {
    const validateForm = (
        from: string,
        to: string,
        departureTime: Date | null,
        arrivalTime: Date | null
    ): boolean => {
        if (!from || !to) {
            EventBus.publish(Messages.FORM_ERROR, "Bitte Abfahrts- und Zielort ausfüllen!");
            return false;
        }

        if (!departureTime && !arrivalTime) {
            EventBus.publish(Messages.FORM_ERROR, "Bitte mindestens eine Abfahrts- oder Ankunftszeit angeben!");
            return false;
        }

        EventBus.publish(Messages.FORM_SUBMITTED, "Formular ist korrekt ausgefüllt!");
        return true;
    };

    return {validateForm};
};
