import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import styled from 'styled-components';
import './App.css';

const AppContainer = styled.div`
  text-align: center;
`;

const OpenCart = styled.button`
  border-radius: 10px;
  border: none;
  font-size: 18px;
  font-family: sans-serif;
  background-color: #0a0a0aeb;
  color: white;
  width: 190px;
  height: 30px;
  padding: 40px 40px;
  margin-bottom: 50px;
  cursor: pointer;
`;

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; quantity: number; description: string; photo: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: { id: string; name: string; price: number; description: string; photo: string }) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === product.id);
      if (itemIndex !== -1) {
        const newItems = [...prevItems];
        newItems[itemIndex].quantity += 1;
        return newItems;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: string) => {
    setCartItems(prevItems => {
      return prevItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
    });
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(prevItems => {
      return prevItems.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <AppContainer>
      <h1>My Store</h1>
      <ProductList addToCart={addToCart} />
      <Cart 
        isOpen={isCartOpen} 
        toggleCart={toggleCart} 
        cartItems={cartItems} 
        increaseQuantity={increaseQuantity} 
        decreaseQuantity={decreaseQuantity} 
      />
      <OpenCart onClick={toggleCart}>Open Cart</OpenCart>
    </AppContainer>
  );
};

export default App;
