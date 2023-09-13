import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { store } from '../app/store/store';
import { Cart } from '../pages/Cart/Cart';

describe('MyBagProps', () => {
  test('', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>,
    );
    const buttonBuy = getByText('Your Bag is Empty');
    expect(buttonBuy).toBeInTheDocument();
  });
});
