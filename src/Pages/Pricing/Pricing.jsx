import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CoinContext } from '../../Context/CoinContext';
import './Pricing.css';

const Pricing = () => {
  const { allCoin, currency } = useContext(CoinContext);

  return (
    <div className="pricing-container">
      <h1>Cryptocurrency Prices</h1>
      <div className="pricing-header">
        <span className="coin-name">Coin</span>
        <span className="coin-price">Price ({currency.symbol})</span>
      </div>
      <div className="pricing-list">
        {allCoin.map((coin) => (
          <Link to={`/coin/${coin.id}`} key={coin.id} className="pricing-item">
            <div className="coin-info">
              <img 
                src={coin.image} 
                alt={coin.name}     
                className="coin-icon logo-size-xl"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
                }}
              />
              <span className="coin-name">{coin.name}</span>
            </div>
            <span className="coin-price"> 
              {currency.symbol}{coin.current_price?.toLocaleString() || 'N/A'}
            </span>
          </Link>
        ))}
      </div>
      <Link to="/home" className="back-button">
        ← Back to Full View
      </Link>
    </div>
  );
};

export default Pricing;
