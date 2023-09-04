import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import RequireAuth from '../app/hoc/RequireAuth';
import { store } from '../app/store/store';

describe('RequireAuth', () => {
  it('must render child components when the user is not authenticated', () => {
    const { getByText } = render(
      <Provider store={store}>
        <RequireAuth>
          <div>Child</div>
        </RequireAuth>
      </Provider>,
    );

    const childComponent = getByText('Child');
    expect(childComponent).toBeInTheDocument();
  });
});
