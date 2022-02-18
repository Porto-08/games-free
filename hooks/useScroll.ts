import { useEffect, useState } from "react";

export const useScroll = () => {
    const [scroll, setScroll] = useState<number>(0);


    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    return { scroll };
}