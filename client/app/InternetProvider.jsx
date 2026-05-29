"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function InternetProvider() {

    useEffect(() => {

        const online = () => {
            toast.success("Internet Connected");
        };

        const offline = () => {
            toast.error("No Internet Connection");
        };

        window.addEventListener("online", online);
        window.addEventListener("offline", offline);

        return () => {
            window.removeEventListener("online", online);
            window.removeEventListener("offline", offline);
        };

    }, []);

    return null;
}