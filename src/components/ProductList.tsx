import React from 'react';
import { useProducts } from '../hooks/useProducts';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  width: 250px;
  max-width: 100%;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  color: #FF0000;
  margin: 16px 0;
`;

const AddToCartButton = styled.button`
  background-color: #31ACB9;
  color: #FFFFFF;
  padding: 8px;
  margin: 8px;
  border: none;
  cursor: pointer;
`;

const ProductList: React.FC = () => {
  const { data, error, isLoading } = useProducts();

  if (isLoading) {
    return (
      <ProductListContainer>
        {Array(6).fill(0).map((_, index) => (
          <ProductCard key={index}>
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={40} />
          </ProductCard>
        ))}
      </ProductListContainer>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        Error loading products. Please try again later.
      </ErrorMessage>
    );
  }

  return (
    <ProductListContainer>
      {data.map((product: any) => (
        <ProductCard key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <AddToCartButton>Add to Cart</AddToCartButton>
        </ProductCard>
      ))}
    </ProductListContainer>
  );
};

export default ProductList;
