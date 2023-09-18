import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { store } from '../app/store/store';
import { Header } from '../widgets/Header/Header';
import authorizationSlice from '../app/store/actions/authorizationAction/authorizationSlice';
import cartSlice from '../app/store/actions/cartAction/cartSlice';

const initialState = {
  authorization: {
    isAuthorization: true,
    isRegistration: false,
  },
  cart: {
    numberOfProductToCart: 0,
  },
};

export const mockStore = configureStore({
  reducer: {
    authorization: authorizationSlice,
    cart: cartSlice,
  },
  preloadedState: initialState,
});

describe('Header', () => {
  test('There should be a logo', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );
    const linkElement = getByText('DigiSet');
    expect(linkElement).toBeInTheDocument();
  });

  test('Without authorization', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );
    expect(getByText('All Products')).toBeInTheDocument();
    expect(getByText('Sign In')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(queryByText('Log out')).toBeNull();
  });

  test('During authorization', () => {
    const { getByText, queryByText } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );
    expect(queryByText('Sign in')).toBeNull();
    expect(queryByText('Sign up')).toBeNull();
    expect(getByText('Log out')).toBeInTheDocument();
  });
});
