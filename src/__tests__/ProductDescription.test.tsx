import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import { store } from '../app/store/store';
import ProductDescription from '../features/ProductDescription/ProductDescription';
import * as ApiCartModule from '../entities/ApiCart/addProductToCart';

const mockAddProductToCart = jest.fn();
jest
  .spyOn(ApiCartModule, 'addProductToCart')
  .mockResolvedValueOnce(mockAddProductToCart);

describe('ProductDescription', () => {
  test('ProductDescription should be on the page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductDescription
            inner={'Advanced Backend Development'}
            description={
              'Designed for advanced learners, this course explores intricate aspects of backend development.'
            }
            price={'130.00'}
            discount={''}
            difficulty={'hard'}
            duration={12}
            productId={'7697b9c3-6cfb-4fcc-b83f-854a66cbd0ab'}
          />
        </MemoryRouter>
      </Provider>,
    );
    const title = getByText('Advanced Backend Development');
    expect(title).toBeInTheDocument();
    const buttonBuy = getByText('Buy Now');
    expect(buttonBuy).toBeInTheDocument();
  });

  test('When you click on the button, there should be an animation', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductDescription
            inner={'Advanced Backend Development'}
            description={
              'Designed for advanced learners, this course explores intricate aspects of backend development.'
            }
            price={'130.00'}
            discount={''}
            difficulty={'hard'}
            duration={12}
            productId={'7697b9c3-6cfb-4fcc-b83f-854a66cbd0ab'}
          />
        </MemoryRouter>
      </Provider>,
    );
    const buttonBuy = getByText('Buy Now');

    fireEvent.click(buttonBuy);

    await waitFor(() => {
      expect(buttonBuy).toHaveClass('change');
    });
  });

  test('When you click on the add button, there should be a delete button', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductDescription
            inner={'Advanced Backend Development'}
            description={
              'Designed for advanced learners, this course explores intricate aspects of backend development.'
            }
            price={'130.00'}
            discount={''}
            difficulty={'hard'}
            duration={12}
            productId={'7697b9c3-6cfb-4fcc-b83f-854a66cbd0ab'}
          />
        </MemoryRouter>
      </Provider>,
    );

    const buttonBuy = getByText('Buy Now');

    await act(async () => {
      fireEvent.click(buttonBuy);
    });

    await waitFor(() => {
      const removeFromCartButton = getByText('Remove from Cart');
      expect(removeFromCartButton).toBeInTheDocument();
    });
  });
});
