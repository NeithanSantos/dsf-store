// ProductList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from '../components/ProductList';

const queryClient = new QueryClient();

test('renders loading state', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ProductList addToCart={() => {}} />
    </QueryClientProvider>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
