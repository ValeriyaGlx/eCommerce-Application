import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

interface SubcategoryNavigationProps {
  category: string;
}

interface Response {
  key: string;
  parent?: {
    id: string;
  };
}

const SubcategoryNavigation: React.FC<SubcategoryNavigationProps> = ({
  category,
}) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<JSX.Element[] | string>('');

  const handleCategoryClick = async (data: string) => {
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
          (product: Response) => (
            <Button
              key={id}
              className={'products-nav-item'}
              data={product.key}
              onClick={() => handleCategoryClick(product.key)}
            />
          ),
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
