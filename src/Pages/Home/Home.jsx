import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../Context/CoinContext';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const inputHandler = (event)=>{
    setInput(event.target.value);
    if(event.target.value === ""){
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler = (event) => {
    event.preventDefault(); 
    const coins = allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    });
    setDisplayCoin(coins);
  }
  useEffect(() => {
    if (allCoin.length > 0) {
      setDisplayCoin(allCoin);
      setLastUpdated(new Date());
    }
  }, [allCoin])

  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace.
          Sign up to explore more about cryptos.</p>
        <div className="last-updated-container">
          <div className="last-updated">
            <span className="update-label">Last Updated: </span>
            <span className="update-time" title={format(lastUpdated, 'PPpp')}>
              {formatDistanceToNow(lastUpdated, { addSuffix: true })}
            </span>
            <button 
              className="refresh-button" 
              onClick={() => setLastUpdated(new Date())}
              title="Refresh data"
            >
              🔄
            </button>
          </div>
          <div className="last-updated-exact">
            {format(lastUpdated, 'PPpp')}
          </div>
        </div>

        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinlist' value={input} type="text" 
          placeholder='search crypto...'  required />

          <datalist id='coinlist'>
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className='crypto-table'>
        <div className='table-layout'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
              <p>{item.market_cap_rank || 'N/A'}</p>
              <div>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
                  }}
                />
                <p>{item.name} - {item.symbol.toUpperCase()}</p>
              </div>
              <p>{currency.symbol}{item.current_price?.toLocaleString() || 'N/A'}</p>
              <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                {item.price_change_percentage_24h ? 
                  `${(Math.round(item.price_change_percentage_24h * 100) / 100).toFixed(2)}%` : 
                  'N/A'}
              </p>
              <p className='market-cap'>
                {currency.symbol}{item.market_cap?.toLocaleString() || 'N/A'}
              </p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
 
export default Home