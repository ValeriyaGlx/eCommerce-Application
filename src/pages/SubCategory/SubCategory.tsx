import React from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../../shared/components/Breadcrumb/Breadcrumbs';
import ProductWithNavigation from '../../features/ProductsWithNavigation/ProductWithNavigation';

const SubCategory = () => {
  const { categoryId, subCategoryId } = useParams();
  if (subCategoryId && categoryId) {
    let subCategoryName = subCategoryId.split('-')[0];
    subCategoryName =
      subCategoryName.charAt(0).toUpperCase() + subCategoryName.slice(1);
    const breadcrumb = [
      {
        value: 'Products',
        path: '/products',
        key: Math.random(),
      },
      {
        value: categoryId,
        path: `/products/${categoryId}`,
        key: Math.random(),
      },
      {
        value: subCategoryName,
        path: `/products/${categoryId}/${subCategoryId}`,
        key: Math.random(),
      },
    ];
    return (
      <main>
        <div className={'container products-inner'}>
          <h1>
            Discover Our Range of
            <span className={'products-inner-colorful'}>
              Products & Categories
            </span>
          </h1>
          <Breadcrumbs breadcrumbs={breadcrumb} />
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
