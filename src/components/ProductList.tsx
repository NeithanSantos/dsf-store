import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: string; 
}

interface ProductListProps {
  addToCart: (product: Product) => void;
}

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  justify-items: center;
  padding: 16px;
`;

const ProductContainer = styled.div`
  border: 1px solid #0c0c0c;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ButtonToAdd = styled.button`
  border-radius: 10px  10px;
  border: none;
  cursor: pointer;
  background-color: black;
  color: white; 
`

const ProductList: React.FC<ProductListProps> = ({ addToCart }) => {
  const { data, error, isLoading } = useQuery('products', async () => {
    const response = await axios.get('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=price&orderBy=DESC');
    return response.data.products;
  });

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <ProductGrid>
      {data.map((product: Product) => (
        <ProductContainer key={product.id}>
          <ProductImage src={product.photo} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <ButtonToAdd onClick={() => addToCart(product)}>Add to Cart</ButtonToAdd>
        </ProductContainer>
      ))}
    </ProductGrid>
  );
};

export default ProductList;
