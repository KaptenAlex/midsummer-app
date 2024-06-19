import { useEffect, useState } from "react";

export const Snackbar = ({ text, success }: { text: string; success: boolean; }) => {
    const [show, setShow] = useState(true);

    // Hide after the setTimeout has expired
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000);
    }, [])

    return (
        <div className={`p-4 w-full shadow-lg rounded-lg absolute top-4 ${success ? 'bg-green-700' : 'bg-red-700'} ${show ? "block" : "hidden"}`}>
            <p className="text-white">{text}</p>
        </div>
    )
}
