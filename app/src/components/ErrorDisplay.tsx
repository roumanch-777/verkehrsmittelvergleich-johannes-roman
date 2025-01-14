import {useEffect, useState} from 'react';
import EventBus from '../utils/EventBus';
import Messages from '../events/messages';
import {toast, ToastContainer} from "react-toastify";

const ErrorDisplay = () => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleFormError = (message: string) => {
            setError(message);
        };

        EventBus.subscribe(Messages.FORM_ERROR, handleFormError);

        return () => {
            EventBus.unsubscribe(Messages.FORM_ERROR, handleFormError);
        };
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true}/>
        </div>
    );
};

export default ErrorDisplay;
