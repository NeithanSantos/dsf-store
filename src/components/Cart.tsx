import React, { useState } from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  width: 225px;
  position: fixed;
  right: 5px;
  top: 10px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);

  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartContainer>
      <h2>Cart</h2>
      {cartItems.map(item => (
        <CartItem key={item.id}>
          <span>{item.name} x {item.quantity}</span>
          <span>${item.price * item.quantity}</span>
        </CartItem>
      ))}
    </CartContainer>
  );
};

export default Cart;
