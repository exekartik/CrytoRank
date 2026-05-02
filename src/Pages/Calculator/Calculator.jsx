import React, { useContext, useState, useEffect } from 'react';
import './Calculator.css';
import { CoinContext } from '../../Context/CoinContext';

const Calculator = () => {
    const { allCoin, currency } = useContext(CoinContext);
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [fiatAmount, setFiatAmount] = useState('');
    const [cryptoAmount, setCryptoAmount] = useState('');

    // Ensure bitcoin is selected initially or fallback to first coin
    useEffect(() => {
        if (allCoin && allCoin.length > 0) {
            const btc = allCoin.find(c => c.id === 'bitcoin');
            if (btc) {
                setSelectedCoin('bitcoin');
            } else {
                setSelectedCoin(allCoin[0].id);
            }
        }
    }, [allCoin]);

    const getSelectedCoinData = () => {
        return allCoin.find(c => c.id === selectedCoin);
    };

    const handleFiatChange = (e) => {
        const value = e.target.value;
        setFiatAmount(value);
        
        const coin = getSelectedCoinData();
        if (coin && value !== '') {
            const price = coin.current_price;
            const cryptoVal = parseFloat(value) / price;
            // format to 8 decimal places max, remove trailing zeroes
            setCryptoAmount(Number(cryptoVal.toFixed(8)).toString());
        } else {
            setCryptoAmount('');
        }
    };

    const handleCryptoChange = (e) => {
        const value = e.target.value;
        setCryptoAmount(value);
        
        const coin = getSelectedCoinData();
        if (coin && value !== '') {
            const price = coin.current_price;
            const fiatVal = parseFloat(value) * price;
            // format to 2 decimal places
            setFiatAmount(fiatVal.toFixed(2));
        } else {
            setFiatAmount('');
        }
    };

    const handleCoinChange = (e) => {
        const newCoinId = e.target.value;
        setSelectedCoin(newCoinId);
        
        // Recalculate crypto amount based on new coin price and existing fiat amount
        const coin = allCoin.find(c => c.id === newCoinId);
        if (coin && fiatAmount !== '') {
            const price = coin.current_price;
            const cryptoVal = parseFloat(fiatAmount) / price;
            setCryptoAmount(Number(cryptoVal.toFixed(8)).toString());
        }
    };

    return (
        <div className="calculator-page">
            <div className="calculator-container">
                <h2>Investment Calculator</h2>
                <p>Calculate your crypto buying power</p>
                
                <div className="calculator-form">
                    <div className="input-group">
                        <label>Select Cryptocurrency</label>
                        <select value={selectedCoin} onChange={handleCoinChange} className="coin-select">
                            {allCoin.map((coin, index) => (
                                <option key={index} value={coin.id}>
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="exchange-icon">
                        <span>⇅</span>
                    </div>

                    <div className="input-group fiat-group">
                        <label>Investment Amount ({currency.name.toUpperCase()})</label>
                        <div className="input-wrapper">
                            <span className="currency-symbol">{currency.symbol}</span>
                            <input 
                                type="number" 
                                placeholder="0.00" 
                                value={fiatAmount} 
                                onChange={handleFiatChange}
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>You Will Receive ({getSelectedCoinData()?.symbol.toUpperCase() || 'CRYPTO'})</label>
                        <div className="input-wrapper">
                            <input 
                                type="number" 
                                placeholder="0.00000000" 
                                value={cryptoAmount} 
                                onChange={handleCryptoChange}
                                min="0"
                            />
                        </div>
                    </div>
                    
                    {getSelectedCoinData() && (
                        <div className="price-info">
                            <p>Current Price: {currency.symbol}{getSelectedCoinData().current_price.toLocaleString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
