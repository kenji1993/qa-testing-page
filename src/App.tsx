import React from 'react';
import Header from './components/Header';
import LandingBanner from './components/LandingBanner';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Header />
      <main>
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
