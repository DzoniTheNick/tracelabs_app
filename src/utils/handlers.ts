import { toast } from "react-toastify";
import { normalInput, errorInput } from "../res/values";

const handleError = (
    message: string, 
    setStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>) => {

        setStyle(errorInput);

        toast(message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    };

const handleReset = (
    setStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>) => {

        setStyle(normalInput);

    };

const handleQuery = (message: string) => {

    toast(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    };

export { handleError, handleReset, handleQuery}