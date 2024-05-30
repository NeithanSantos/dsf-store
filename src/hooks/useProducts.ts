import { useQuery } from 'react-query';

const fetchProducts = async () => {
  const res = await fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const useProducts = () => {
  return useQuery('products', fetchProducts);
};
