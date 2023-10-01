import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../app/store/store';
import ProductCard from '../entities/ProductCard/ProductCard';

test('The productCard must be on the page', () => {
  const { getByRole } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductCard
          key={0.87}
          path={'it-recruiter'}
          imageUrl={'https://1d0c.jpg'}
          productName={'IT Recruiter'}
          description={
            'Embark on a journey to become a skilled IT Recruiter with our specialized course.'
          }
          price={'100.00'}
          difficulty={'easy'}
          duration={3}
          productId={'8ba514c0-6e6c-4805-bfa5-675033d35cdd'}
        />
      </MemoryRouter>
    </Provider>,
  );
  const productCard = getByRole('product-card');

  expect(productCard).toBeInTheDocument();
});
