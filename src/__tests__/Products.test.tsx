import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../app/store/store';
import Products from '../pages/Products/Products';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = getByText('Products & Categories');
  expect(linkElement).toBeInTheDocument();
});
