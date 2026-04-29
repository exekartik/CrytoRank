import React, { useContext, useMemo, useState } from 'react'
import './Features.css'
import { Link } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContext'

const FeatureCard = ({ title, desc, to, action, children }) => (
  <article className='feature-card'>
    <div className='feature-content'>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className='feature-extra'>
        {children}
      </div>
    </div>
    {to && (
      <div className='feature-actions'>
        <Link to={to} className='feature-btn'>{action || 'Open'}</Link>
      </div>
    )}
  </article>
)

const Features = () => {
  const { allCoin, currency } = useContext(CoinContext)
  const [page, setPage] = useState(0) // 0 => first 3 cards, 1 => next 3 cards

  const sampleCoins = useMemo(() => (allCoin || []).slice(0, 6), [allCoin])

  // Build all feature definitions (6 total)
  const featuresData = useMemo(() => [
    {
      key: 'prices',
      node: (
        <FeatureCard
          title='Live Prices'
          desc={`Real-time market data refreshed every minute. View prices in ${currency.symbol} with 24h change, market cap, and volume.`}
          to='/pricing'
          action='View Prices'
        >
          <div className='chips'>
            {sampleCoins.map(c => (
              <span key={c.id} className={`chip ${c.price_change_percentage_24h >= 0 ? 'up' : 'down'}`}>
                <img src={c.image} alt={c.symbol} loading='lazy' />
                {c.symbol?.toUpperCase()} · {currency.symbol}{c.current_price?.toLocaleString()}
              </span>
            ))}
          </div>
        </FeatureCard>
      )
    },
    {
      key: 'dashboard',
      node: (
        <FeatureCard
          title='Interactive Dashboard'
          desc='Quick overview of top movers, trends, and key market stats to stay informed at a glance.'
          to='/dashboard'
          action='Open Dashboard'
        >
          <ul className='bullets'>
            <li>Top market cap coins</li>
            <li>24h performance indicators</li>
            <li>Clean, responsive layout</li>
          </ul>
        </FeatureCard>
      )
    },
    {
      key: 'coin-details',
      node: (   
        <FeatureCard
          title='Coin Details'
          desc='Deep-dive into any cryptocurrency with a dedicated detail page just a click away.'
          to='/coin/bitcoin'
          action='See Example'
        >
          <div className='chips'>
            {sampleCoins.slice(0, 3).map(c => (
              <Link key={c.id} className='chip link' to={`/coin/${c.id}`}>
                <img src={c.image} alt={c.symbol} loading='lazy' />
                {c.name}
              </Link>
            ))}
          </div>
        </FeatureCard>
      )
    },
    {
      key: 'currency',
      node: (
        <FeatureCard
          title='Currency Switcher'
          desc='Switch between USD, EUR, and INR instantly from the navbar to see localized prices.'
          to='/'
          action='Try it on Navbar'
        >
          <div className='switcher-preview'>
            <span className='tag'>Current: {currency.symbol}</span>
            <span className='note'>(change from the Navbar)</span>
          </div>
        </FeatureCard>
      )
    },
    {
      key: 'auth',
      node: (
        <FeatureCard
          title='Authentication'
          desc='Sign up or log in to personalize your experience. Quick access from the navbar.'
          to='/'
          action='Open Auth'
        >
          <ul className='bullets'>
            <li>One-click login modal</li>
            <li>Secure session handling</li>
          </ul>
        </FeatureCard>
      )
    },
    {
      key: 'blog',
      node: (
        <FeatureCard
          title='Blog Highlights'
          desc='Beautiful grid showcasing top coins with images and live metrics, powered by CoinGecko.'
          to='/blog'
          action='Read Blog'
        >
          <div className='chips'>
            {sampleCoins.slice(0, 4).map(c => (
              <span key={c.id} className='chip neutral'>
                <img src={c.image} alt={c.symbol} loading='lazy' />
                {c.symbol?.toUpperCase()}
              </span>
            ))}
          </div>
        </FeatureCard>
      )
    }
  ], [currency.symbol, sampleCoins])

  const visible = useMemo(() => {
    const start = page * 3
    return featuresData.slice(start, start + 3)
  }, [featuresData, page])

  const handleAdvance = () => {
    setPage(p => (p + 1) % 2)
  }

  return (
    <div className='features-page'>
      <header className='features-hero'>
        <h1 className='font-bold'>Powerful features for crypto tracking</h1>
      </header>

      {/* Force re-mount on page change so animations replay */}
      <section key={page} className='features-grid three-cols'>
        {visible.slice(0, 2).map((item) => (
          <div key={item.key} className='stagger-item'>
            {item.node}
          </div>
        ))}

        {/* Third visible card is clickable to advance/back */}
        {visible.slice(2, 3).map((item) => (
          <div
            key={item.key}
            className='stagger-item third-trigger'
            role='button'
            tabIndex={0}
            onClick={handleAdvance}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAdvance() }}
            aria-label={page === 0 ? 'Show next features' : 'Show previous features'}
            title={page === 0 ? 'Click to see more features' : 'Click to go back'}
          >
            {item.node}
          </div>
        ))}
      </section>
    </div>
  )
}

export default Features
