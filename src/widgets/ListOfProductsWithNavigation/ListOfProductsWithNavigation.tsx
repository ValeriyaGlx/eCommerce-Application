import React, { useEffect, useState } from 'react';

import Button from '../../shared/components/Button/Button';
import { PRODUCTS_SORT_DATA as sortArray } from '../../constants/productsConstant/productsConstants';
import arrow from '../../assets/icons/down-arrow-black.png';
import SelectTag from '../../shared/components/SelectTag/SelectTag';
import './_ListOfProductsWithNavigation.scss';
import ProductCard from '../../entities/ProductCard/ProductCard';
import { getAccessToken } from '../SignUpSection/usage/ApiRegistration';
import { AllProductsRequest } from '../../features/ProductsWithNavigation/ApiProduct';

function clickAllCategories() {
  console.log(1);
}

const ListOfProductsWithNavigation = () => {
  const [productData, setProductData] = useState<JSX.Element[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await getAccessToken();
        const token = tokenResponse.access_token;
        const listOfProduct = await AllProductsRequest(token);
        const productJSX: JSX.Element[] = listOfProduct.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.image}
            productName={product.name}
            description={product.description}
            price={product.price}
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

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className={'wrapper-sorting'}>
          <nav className={'products-nav'}>
            <Button
              className={'products-nav-item products-nav-item_active'}
              data={'All Categories'}
              onClick={clickAllCategories}
            />
            <Button
              className={'products-nav-item'}
              data={'Free'}
              onClick={clickAllCategories}
            />
            <Button
              className={'products-nav-item'}
              data={'Programming'}
              onClick={clickAllCategories}
            />
            <Button
              className={'products-nav-item'}
              data={'Data analysis'}
              onClick={clickAllCategories}
            />
            <Button
              className={'products-nav-item'}
              data={'Design'}
              onClick={clickAllCategories}
            />
            <Button
              className={'products-nav-item'}
              data={'Management'}
              onClick={clickAllCategories}
            />
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
