import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../app/store/store';
import Product from '../pages/Product/Product';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = getByText('Loading...');
  expect(linkElement).toBeInTheDocument();
});
