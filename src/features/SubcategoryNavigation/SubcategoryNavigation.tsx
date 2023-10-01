import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import {
  CATEGORIES_OF_PRODUCTS as categories,
  IButtonNavigation,
} from '../../constants/productsConstant/productsConstants';
import Button from '../../shared/components/Button/Button';
import { getAccessToken } from '../../widgets/SignUpSection/usage/ApiRegistration';
import setToken from '../../shared/cookie/setToken';
import {
  getCategories,
  getCategory,
} from '../../widgets/ListOfProductsWithNavigation/ApiProduct';
import { setCurrentPage } from '../../app/store/actions/paginationAction/paginationSlice';
import { store } from '../../app/store/store';

interface SubcategoryNavigationProps {
  category: string;
}

interface Response {
  key: string;
  name: {
    'en-US': string;
  };
  parent?: {
    id: string;
  };
}

type RootState = ReturnType<typeof store.getState>;

const SubcategoryNavigation: React.FC<SubcategoryNavigationProps> = ({
  category,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<JSX.Element[] | string>('');

  const handleCategoryClick = async (data: string) => {
    dispatch(setCurrentPage(1));
    navigate(`/products/${category}/${data}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await getAccessToken();
        const token = tokenResponse.access_token;
        setToken('accessToken', token);
        const categoryObj = categories.find(
          (item) => item.data === category,
        ) as IButtonNavigation;
        const id = await getCategory(token, categoryObj.value);
        const allCategories = await getCategories(token);
        const subCategories = allCategories.filter(
          (item: Response) => item.parent && item.parent.id === id,
        );
        const productJSX: JSX.Element[] = subCategories.map(
          (product: Response) => {
            const productName =
              product.name['en-US'].charAt(0).toUpperCase() +
              product.name['en-US'].slice(1);
            return (
              <Button
                role={'navigation-products'}
                key={Math.random()}
                className={'products-nav-item'}
                data={productName}
                onClick={() => handleCategoryClick(product.key)}
              />
            );
          },
        );
        setProductData(productJSX);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className={'products-nav'}>
      <Button
        className={'products-nav-item products-nav-item_active'}
        data={category}
      />
      {productData}
    </nav>
  );
};

export default SubcategoryNavigation;
