import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>My Store</h1>
      <ProductList />
      <Cart />
    </div>
  );
};

export default App;
