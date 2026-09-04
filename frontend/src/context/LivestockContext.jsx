import { createContext, useContext, useEffect, useState } from "react";
import { getLivestock } from "../api/livestockApi";

const Livestockcontext = createContext();

export const LivestockProvider = ({ children }) => {
    const [livestock, setLivestock] = useState([]);
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
        <Livestockcontext.Provider value={{ livestock, loading }}>
            {children}
        </Livestockcontext.Provider>
    );
};

export const useLivestockContext = () => {
    return useContext(Livestockcontext)
};
