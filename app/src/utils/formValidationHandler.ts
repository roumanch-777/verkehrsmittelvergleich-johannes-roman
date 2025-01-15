import EventBus from "./EventBus";
import Messages from "../events/messages";

export const formValidationHandler = () => {
    const validateForm = (
        from: string,
        to: string,
        departureTime: Date | null
    ): boolean => {
        if (!from || !to) {
            EventBus.publish(Messages.FORM_ERROR, "Bitte Abfahrts- und Zielort ausfüllen!");
            return false;
        }

        if (!departureTime) {
            EventBus.publish(Messages.FORM_ERROR, "Bitte Ankunftszeit angeben!");
            return false;
        }

        EventBus.publish(Messages.FORM_SUBMITTED, "Formular ist korrekt ausgefüllt!");
        return true;
    };

    return {validateForm};
};
