import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Coin from './Pages/Coin/Coin';
import Dashboard from './Pages/Dashboard/Dashboard';
import Pricing from './Pages/Pricing/Pricing';
import Blog from './Pages/Blog/Blog';
import Features from './Pages/Features/Features';
import Footer from './Components/Footer/Footer';
import { AuthProvider } from './Context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/dashboard" replace />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/home' element={<Home />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/features' element={<Features />} />
          <Route path='/coin/:coinId' element={<Coin />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App

