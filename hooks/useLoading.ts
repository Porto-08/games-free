import { useEffect, useState } from "react";

export const useLoadingPage = () => {
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };

        window.addEventListener("load", (event) => {
            handleLoad();
        });

        return () => {
            window.removeEventListener("load", handleLoad);
        };

    }, []);

    return { loading };
}