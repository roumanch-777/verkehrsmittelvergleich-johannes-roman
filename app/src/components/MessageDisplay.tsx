import {useEffect} from 'react';
import EventBus from '../utils/EventBus';
import Messages from '../events/messages';
import {toast, ToastContainer} from "react-toastify";

const MessageDisplay = () => {

    useEffect(() => {
        const handleFormError = (message: string) => {
            toast.error(message);
        };

        const handelFormSuccess = (message: string) => {
            toast.success(message);
        }

        EventBus.subscribe(Messages.FORM_ERROR, handleFormError);
        EventBus.subscribe(Messages.FORM_SUBMITTED, handelFormSuccess);

        return () => {
            EventBus.unsubscribe(Messages.FORM_ERROR, handleFormError);
            EventBus.unsubscribe(Messages.FORM_SUBMITTED, handelFormSuccess);
        };
    }, []);

    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false}/>
        </div>
    );
};

export default MessageDisplay;
