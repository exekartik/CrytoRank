import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$",
    });

    const fetchAllCoin = async () => {
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "x-cg-demo-api-key": "CG-a2MqUYasC5fLneRy7nodAY3F",
                    // Prevent stale cache from returning outdated prices
                    "cache-control": "no-cache"
                },
                cache: "no-store"
            };

            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h&precision=2&_t=${Date.now()}`;

            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                setAllCoin(Array.isArray(data) ? data : []);
            } else {
                console.error("API error:", response.status);
            }
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    };

    useEffect(() => {
        fetchAllCoin();
        // Auto-refresh every 60 seconds to keep prices in sync
        const intervalId = setInterval(fetchAllCoin, 60000);
        return () => clearInterval(intervalId);
    }, [currency]); // Re-fetch when currency changes

    const contextValue = { allCoin, currency, setCurrency };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
