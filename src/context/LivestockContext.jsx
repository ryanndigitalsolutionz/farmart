import { createContext, useContext, useEffect, useState } from "react";
import { getLivestock } from "../api/livestockApi";

const livestockcontext = createContext();

export const livestockProvider = ({ children }) => {
    const [livestock, setLivestock] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLivestock = async () => {
            const data = await getLivestock(); 
            setLivestock(data);
            setLoading(false);
        };

        loadLivestock();
    }, []);

    return (
        <livestockcontext.Provider value={{ livestock, loading }}>
            {children}
        </livestockcontext.Provider>
    );
};

export const useLivestockContext = () => {
    return useContext(Livestockcontext)
};