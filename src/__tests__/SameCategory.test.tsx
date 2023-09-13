import React from 'react';
import { render } from '@testing-library/react';

import SameCategory from '../widgets/SameCategory/SameCategory';

test('', () => {
  const { getByText } = render(<SameCategory />);
  const title = getByText('Same category products:');
  expect(title).toBeInTheDocument();
});
