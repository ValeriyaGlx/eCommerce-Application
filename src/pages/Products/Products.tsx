import React from 'react';

import ProductWithNavigation from '../../features/ProductsWithNavigation/ProductWithNavigation';
import './_Products.scss';

const Products = () => {
  return (
    <main>
      <div className={'container products-inner'}>
        <h1>
          Discover Our Range of
          <span className={'products-inner-colorful'}>
            Products & Categories
          </span>
        </h1>
        <ProductWithNavigation />
      </div>
    </main>
  );
};

export default Products;
