import { eventBus } from "./EventBus";
import { Messages } from "../models/messages";

export const formValidationHandler = () => {
    const validateForm = (
        from: string,
        to: string,
        departureTime: Date | null
    ): boolean => {
        if (!from || !to) {
            eventBus.publish(Messages.FORM_ERROR, "Bitte Abfahrts- und Zielort ausfüllen!");
            return false;
        }

        if (!departureTime) {
            eventBus.publish(Messages.FORM_ERROR, "Bitte Abfahrtszeit angeben!");
            return false;
        }

        return true;
    };

    return { validateForm };
};
