import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../app/store/store';
import Logo from '../shared/Logo/Logo';

test('The logo must be on the page', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Logo className={'logo-title-black'} />
      </MemoryRouter>
    </Provider>,
  );
  const title = getByText('DigiSet');
  expect(title).toBeInTheDocument();
});
