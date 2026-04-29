import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContext';
import Linechart from '../../Components/Linechart/Linechart';

const Coin = () => {

  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-a2MqUYasC5fLneRy7nodAY3F"
      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('API error');
      })
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: "application/json", "x-cg-demo-api-key": "CG-a2MqUYasC5fLneRy7nodAY3F"
      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`, options)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('API error');
      })
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }


  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency])

  if (coinData && historicalData && coinData.name) {
    return (
      <div className='coin'>
        <div className='coin-name'>
          <img src={coinData.image.large} alt=''/>
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className='coin-chart'>
          <Linechart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.name} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Mraket cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>

    )
  }
  else {

    return (
      <div className='spinner'>
        <div className='spin'></div>

      </div>
    )

  }

}

export default Coin
