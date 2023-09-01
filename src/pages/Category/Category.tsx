import React from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../../shared/components/Breadcrumb/Breadcrumbs';
import ProductWithNavigation from '../../features/ProductsWithNavigation/ProductWithNavigation';

const Category = () => {
  const { categoryId } = useParams();
  if (categoryId) {
    const breadcrumb = [
      {
        value: 'Home',
        path: '/',
      },
      {
        value: 'Products',
        path: '/products',
      },
      {
        value: categoryId,
        path: `/products/${categoryId}`,
      },
    ];
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
          <ProductWithNavigation category={categoryId} />
        </div>
      </main>
    );
  }
};

export default Category;
