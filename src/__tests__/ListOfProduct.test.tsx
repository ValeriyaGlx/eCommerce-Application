import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ListOfProductsWithNavigation from '../widgets/ListOfProductsWithNavigation/ListOfProductsWithNavigation';
import { store } from '../app/store/store';

describe('Products', () => {
  const setup = () => {
    const utils = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListOfProductsWithNavigation
            category={'All Categories'}
            token={'1111'}
          />
          ,
        </MemoryRouter>
      </Provider>,
    );
    const category = utils.getByText('All Categories');

    return {
      ...utils,
      category,
    };
  };

  test('There should be a button "All Categories" on the page', () => {
    const { category } = setup();
    expect(category).toBeInTheDocument();
  });

  test('There should be 6 buttons  on the page', () => {
    const { container } = setup();
    const buttons = container.getElementsByClassName('products-nav-item');
    expect(buttons.length).toBe(6);
  });
});

describe('Category', () => {
  test('There should be a button "Programming" on the page', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListOfProductsWithNavigation
            category={'Programming'}
            token={'1111'}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(getByText('Programming')).toBeInTheDocument();
  });

  test('There should be Loading', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListOfProductsWithNavigation
            category={'Programming'}
            token={'1111'}
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
