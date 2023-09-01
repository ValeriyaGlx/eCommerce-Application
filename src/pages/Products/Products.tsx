import React from 'react';

import ProductWithNavigation from '../../features/ProductsWithNavigation/ProductWithNavigation';
import './_Products.scss';
import Breadcrumbs from '../../shared/components/Breadcrumb/Breadcrumbs';

const breadcrumb = [
  {
    value: 'Home',
    path: '/',
  },
  {
    value: 'Products',
    path: '/products',
  },
];

const Products = () => {
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumb} />
      <div className={'container products-inner'}>
        <h1>
          Discover Our Range of
          <span className={'products-inner-colorful'}>
            Products & Categories
          </span>
        </h1>
        <ProductWithNavigation category={'All Categories'} />
      </div>
    </main>
  );
};

export default Products;
