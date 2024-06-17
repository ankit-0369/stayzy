import { useEffect } from "react";


type Toast = {
    type: "SUCCESS" | "ERROR",
    message: string,
    onClose: () => void;
}
const Toast = ({ type, message, onClose }: Toast) => {

    useEffect(()=>{

        const timer= setTimeout(() => {
            onClose();
        }, 5000);

        return ()=>{
            clearTimeout(timer)
            console.log("toast unmounted");
          
        }

    }, [onClose])

    const style = type === "SUCCESS"
    ? "fixed top-20 md:bottom-10  right-4 z-[1000] p-4 rounded-md bg-green-600 text-white max-w-md"
    : "fixed top-20 md:bottom-10 right-4 z-[1000] p-4 rounded-md bg-red-600 text-white max-w-md";

    return (
        <div className={`${style} h-10 justify-center items-center flex`}>
            <div className="flex justify-center items-center">
                <span className="text-base text-white"> {message} </span>
            </div>
        </div>
    )
}

export default Toast;