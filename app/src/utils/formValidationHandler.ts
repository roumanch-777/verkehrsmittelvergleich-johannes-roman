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
            EventBus.publish(Messages.FORM_ERROR, "Bitte Abfahrtszeit angeben!");
            return false;
        }

        return true;
    };

    return {validateForm};
};
