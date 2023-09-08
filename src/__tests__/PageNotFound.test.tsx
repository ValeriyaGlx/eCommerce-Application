import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../app/store/store';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = getByText('Oops... Page not found');
  expect(linkElement).toBeInTheDocument();
});
