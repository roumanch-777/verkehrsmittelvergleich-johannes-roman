import { useEffect } from 'react';
import { eventBus } from '../utils/EventBus';
import { Messages } from '../models/messages';
import { toast, ToastContainer } from "react-toastify";

export const MessageDisplay = () => {

    useEffect(() => {
        const handleFormError = (message: string) => {
            toast.error(message);
        };

        const handelFormSuccess = (message: string) => {
            toast.success(message);
        }

        eventBus.subscribe(Messages.FORM_ERROR, handleFormError);
        eventBus.subscribe(Messages.FORM_SUBMITTED, handelFormSuccess);

        return () => {
            eventBus.unsubscribe(Messages.FORM_ERROR, handleFormError);
            eventBus.unsubscribe(Messages.FORM_SUBMITTED, handelFormSuccess);
        };
    }, []);

    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};
