import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../app/store/store';
import SignUp from '../pages/SignUp/SignUp';

test('there should be a Welcome Back!', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = getByText('Welcome Back!');
  expect(linkElement).toBeInTheDocument();
});

test('there should be a Create Account!', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = getByText('Create Account');
  expect(linkElement).toBeInTheDocument();
});
