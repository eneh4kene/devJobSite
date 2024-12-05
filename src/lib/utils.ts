import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
    let message;
    if (error instanceof Error) {
        message = error.message
    }else if (error === String) {
        message = error
    }else {
        message = "An error occurred"
    }

    toast.error(message);
}