import React from 'react';
import Header from './components/Header';
import LandingBanner from './components/LandingBanner';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111111]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[#c8102e] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main-content">
        <LandingBanner />
        <div id="menu">
          <ProductList />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default App;
