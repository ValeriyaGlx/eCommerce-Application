import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import InputValidationPassword from '../entities/InputValidationPassword/InputValidationPassword';
import { store } from '../app/store/store';

test('The input must be on the page', () => {
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <InputValidationPassword
        inputName={'password'}
        type={'password'}
        placeholder={'Password'}
      />
    </Provider>,
  );
  const input = getByPlaceholderText('Password');

  expect(input).toBeInTheDocument();
});
