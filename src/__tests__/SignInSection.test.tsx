import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../app/store/store';
import SignInSection from '../widgets/SignInSection/SignInSection';

test('', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SignInSection />
      </MemoryRouter>
    </Provider>,
  );
  const title = getByText('Login to Your Account');
  expect(title).toBeInTheDocument();
});
