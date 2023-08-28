import React, { useEffect, useState } from 'react';

import Button from '../../shared/components/Button/Button';
import {
  CATEGORIES_OF_PRODUCTS as categories,
  PRODUCTS_SORT_DATA as sortArray,
} from '../../constants/productsConstant/productsConstants';
import arrow from '../../assets/icons/down-arrow-black.png';
import SelectTag from '../../shared/components/SelectTag/SelectTag';
import './_ListOfProductsWithNavigation.scss';
import ProductCard from '../../entities/ProductCard/ProductCard';
import { getAccessToken } from '../SignUpSection/usage/ApiRegistration';
import setToken from '../../shared/cookie/setToken';

import { AllProductsRequest } from './ApiProduct';

const ListOfProductsWithNavigation = () => {
  const [productData, setProductData] = useState<JSX.Element[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Categories');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await getAccessToken();
        const token = tokenResponse.access_token;
        setToken('accessToken', token);
        const listOfProduct = await AllProductsRequest(token);
        const productJSX: JSX.Element[] = listOfProduct.map((product) => (
          <ProductCard
            key={product.id}
            path={product.key}
            imageUrl={product.image}
            productName={product.name}
            price={product.price}
            description={product.description}
            discount={product.discount ? product.discount : ''}
          />
        ));

        setProductData(productJSX);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (data: string) => {
    setIsLoading(true);
    setActiveCategory(data);
    const category = categories.find((item) => item.data === data);
    if (category && category.onclick) {
      const listOfProduct = await category.onclick();
      if (listOfProduct) {
        const productJSX: JSX.Element[] = listOfProduct.map((product) => (
          <ProductCard
            key={product.id}
            path={product.key}
            imageUrl={product.image}
            productName={product.name}
            price={product.price}
            description={product.description}
            discount={product.discount ? product.discount : ''}
          />
        ));
        setIsLoading(false);
        setProductData(productJSX);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className={'wrapper-sorting'}>
          <nav className={'products-nav'}>
            {categories.map(({ data, id }) => (
              <Button
                key={id}
                className={`products-nav-item ${
                  data === activeCategory ? 'products-nav-item_active' : ''
                }`}
                data={data}
                onClick={() => handleCategoryClick(data)}
              />
            ))}
          </nav>
          <SelectTag
            selectArray={sortArray}
            className={'sort-select'}
            value={'Sorting'}
            inputName={'sort-select-tag'}
            onClick={() => {
              console.log('here will be implement redux save logic');
            }}
            arrow={arrow}
          />
        </div>

        <div className={'wrapper-products'}>{productData}</div>
      </>
    );
  }
};

export default ListOfProductsWithNavigation;
