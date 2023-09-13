import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../app/store/store';
import Product from '../pages/Product/Product';

jest.mock('../pages/Product/productAPI', () => ({
  getProduct: jest.fn().mockResolvedValue({
    name: 'backend-advanced',
    description: 'Mocked Description',
    images: [{ url: 'mocked-image.jpg' }],
    prices: '100',
    difficulty: 'Easy',
    duration: 60,
    productId: '123',
  }),
}));

test('There must be a loading', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/products/backend-advanced']}>
        <Routes>
          <Route path='/products/:productId' element={<Product />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  expect(getByTestId('loading-spinner')).toBeInTheDocument();
});

test('renders learn react link', async () => {
  const { getByText, findByText } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/products/backend-advanced']}>
        <Routes>
          <Route path='/products/:productId' element={<Product />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  await findByText('404');
  expect(getByText('Oops... Page not found')).toBeInTheDocument();
});
