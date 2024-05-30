import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from '../components/ProductList';

const queryClient = new QueryClient();

describe('ProductList', () => {
  it('displays loading skeletons when loading', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>
    );
    
    expect(screen.getAllByText(/loading/i)).toHaveLength(6);
  });

  it('displays products when data is fetched', async () => {
    // Mock da resposta da API
    const products = [
      { id: 1, name: 'Product 1', price: '$10' },
      { id: 2, name: 'Product 2', price: '$20' },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ products }),
      })
    ) as jest.Mock;

    render(
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>
    );

    const productNames = await screen.findAllByText(/Product/i);
    expect(productNames).toHaveLength(2);
  });
});
