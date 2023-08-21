import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import FormSubmitSignIn from '../features/formSubmitSignIn/view/FormSubmitSignIn';
import { store } from '../app/store/store';
import { HomePage } from '../pages/HomePage/HomePage';

describe('handleFormSubmitt', () => {
  test('there must be a form', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
          <FormSubmitSignIn />
        </MemoryRouter>
      </Provider>,
    );
    const formElement = container.querySelector('form');

    expect(formElement).toBeInTheDocument();
  });

  test('there must be a form', () => {
    const { getByPlaceholderText, getByDisplayValue, queryByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FormSubmitSignIn />
        </MemoryRouter>
      </Provider>,
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(passwordInput, { target: { value: '~123Qwer' } });
    fireEvent.change(emailInput, { target: { value: 'instance@gmail.com' } });
    const submitButton = getByDisplayValue('Sign in');
    fireEvent.click(submitButton);
    expect(queryByText('TRY AGAIN')).not.toBeInTheDocument();
  });
});
