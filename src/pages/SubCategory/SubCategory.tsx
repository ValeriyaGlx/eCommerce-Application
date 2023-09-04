import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../../shared/components/Breadcrumb/Breadcrumbs';
import ProductWithNavigation from '../../features/ProductsWithNavigation/ProductWithNavigation';
import { CATEGORIES_OF_PRODUCTS as categories } from '../../constants/productsConstant/productsConstants';
import {
  getCategories,
  IResponseCategory,
} from '../../widgets/ListOfProductsWithNavigation/ApiProduct';
import getCookie from '../../shared/cookie/getCookie';
import PageNotFound from '../PageNotFound/PageNotFound';

const SubCategory = () => {
  const [pageFound, setPageFound] = useState(true);
  const { categoryId, subCategoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryObj = categories.find((item) => item.data === categoryId);
        const token = getCookie('accessToken') as string;
        const categoriesObj = await getCategories(token);
        const subCategory = categoriesObj.find(
          (item: IResponseCategory) => item.key === subCategoryId,
        );
        if (categoryObj === undefined || subCategory === undefined)
          setPageFound(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
              <ProductWithNavigation
                category={categoryId}
                subCategory={subCategoryId}
              />
            </div>
          </main>
        )}
      </>
    );
  }
};

export default SubCategory;
