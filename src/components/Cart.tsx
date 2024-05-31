import React from 'react';
import styled from 'styled-components';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  toggleCart: () => void;
  cartItems: CartItem[];
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

const CartContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #f5f4f4af;
  z-index: 999;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: #050505;
    color: white;
    border-radius: 10px 10px;
    border: none;
    cursor: pointer;
    padding: 2px 5px;
    margin: 0 5px;
  }
`;

const Total = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #060606;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart, cartItems, increaseQuantity, decreaseQuantity }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContainer isOpen={isOpen}>
      <h2>Cart</h2>
      {cartItems.map(item => (
        <CartItemContainer key={item.id}>
          <span>{item.name}</span>
          <QuantityControl>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </QuantityControl>
          <span>${item.price * item.quantity}</span>
        </CartItemContainer>
      ))}
      <Total>
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </Total>
      <CheckoutButton onClick={() => alert('Finalizar Compra')}>Finalizar Compra</CheckoutButton>
    </CartContainer>
  );
};

export default Cart;
