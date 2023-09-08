import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../../shared/components/Breadcrumb/Breadcrumbs';
import ProductWithNavigation from '../../features/ProductsWithNavigation/ProductWithNavigation';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CATEGORIES_OF_PRODUCTS as categories } from '../../constants/productsConstant/productsConstants';

const Category = () => {
  const [pageFound, setPageFound] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    const categoryObj = categories.find((item) => item.data === categoryId);
    if (categoryObj === undefined) setPageFound(false);
  }, []);

  if (categoryId) {
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
    ];
    return (
      <>
        {!pageFound && <PageNotFound />}
        {pageFound && (
          <main>
            <div className={'container products-inner'}>
              <h1>
                Discover Our Range of
                <span className={'products-inner-colorful'}>
                  Products & Categories
                </span>
              </h1>
              <Breadcrumbs breadcrumbs={breadcrumb} />
              <ProductWithNavigation category={categoryId} />
            </div>
          </main>
        )}
      </>
    );
  }
};

export default Category;
