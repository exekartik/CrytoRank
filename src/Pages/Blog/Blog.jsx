import React, { useContext, useMemo } from 'react'
import './Blog.css'
import { CoinContext } from '../../Context/CoinContext'

const Blog = () => {
  const { allCoin, currency } = useContext(CoinContext)

  const coins = useMemo(() => {
    // Take top 24 by market cap to keep the page light
    return (allCoin || []).slice(0, 24)
  }, [allCoin])

  return (
    <div className='blog-page'>
      <div className='blog-header'>
        <h1>Latest Crypto Highlights</h1>
        <p>Live market snapshots powered by CoinGecko. Prices auto-refresh every minute. Currency: <strong>{currency?.symbol?.toUpperCase?.() || currency?.symbol}</strong></p>
      </div>

      <div className='blog-grid'>
        {coins.map((coin) => (
          <article key={coin.id} className={`blog-card ${coin.price_change_percentage_24h >= 0 ? 'up' : 'down'}`}>
            <header className='card-header'>
              <img src={coin.image} alt={coin.name} loading='lazy' />
              <div className='title-wrap'>
                <h2>{coin.name}</h2>
                <span className='symbol'>{coin.symbol?.toUpperCase()}</span>
              </div>
            </header>

            <section className='card-body'>
              <div className='price-row'>
                <span className='label'>Price</span>
                <span className='value'>
                  {currency.symbol}{coin.current_price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className='price-row'>
                <span className='label'>24h Change</span>
                <span className={`value change ${coin.price_change_percentage_24h >= 0 ? 'pos' : 'neg'}`}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </div>
              <div className='meta'>
                <span>Market Cap: {currency.symbol}{coin.market_cap?.toLocaleString()}</span>
                <span>24h Vol: {currency.symbol}{coin.total_volume?.toLocaleString()}</span>
              </div>
            </section>

            <footer className='card-footer'>
              <a className='read-more' href={`https://www.coingecko.com/en/coins/${coin.id}`} target='_blank' rel='noreferrer'>
                View details
              </a>
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Blog
