import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../app/store/store';
import SignUp from '../pages/SignUp/SignUp';
import SignUpSection from '../widgets/SignUpSection/view/SignUpSection';

test('textbox', () => {
  const { getAllByRole } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SignUpSection />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = getAllByRole('textbox');
  expect(linkElement.length).toBe(3);
});

test('button', () => {
  const { getAllByRole } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = getAllByRole('button');
  expect(linkElement.length).toBe(2);
});

test('password', () => {
  const { getAllByPlaceholderText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = getAllByPlaceholderText('Email');
  expect(linkElement.length).toBe(1);
});
