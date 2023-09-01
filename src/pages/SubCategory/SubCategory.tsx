import React from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../../shared/components/Breadcrumb/Breadcrumbs';
import ProductWithNavigation from '../../features/ProductsWithNavigation/ProductWithNavigation';

const SubCategory = () => {
  const { categoryId, subCategoryId } = useParams();
  if (subCategoryId && categoryId) {
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
      {
        value: subCategoryId,
        path: `/products/${categoryId}/${subCategoryId}`,
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
          <ProductWithNavigation
            category={categoryId}
            subCategory={subCategoryId}
          />
        </div>
      </main>
    );
  }
};

export default SubCategory;
