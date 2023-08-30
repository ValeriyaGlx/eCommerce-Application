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
import getCookie from '../../shared/cookie/getCookie';
import Filter from '../../entities/Filtering/Filtering';

import {
  AllProductsRequest,
  IProducts,
  sortAllProductsRequest,
} from './ApiProduct';

const ListOfProductsWithNavigation = () => {
  const [productData, setProductData] = useState<JSX.Element[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [nameSorting, setNameSorting] = useState('Sorting');

  const createHTMLListOfProducts = (
    listOfProducts: Array<IProducts> | undefined,
  ) => {
    if (listOfProducts) {
      const productJSX: JSX.Element[] = listOfProducts.map(
        (product: IProducts) => (
          <ProductCard
            key={product.id}
            path={product.key}
            imageUrl={product.image}
            productName={product.name}
            price={product.price}
            description={product.description}
            discount={product.discount ? product.discount : ''}
            duration={product.duration}
            difficulty={product.difficulty}
          />
        ),
      );
      setIsLoading(false);
      setProductData(productJSX);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await getAccessToken();
        const token = tokenResponse.access_token;
        setToken('accessToken', token);
        const listOfProduct = await AllProductsRequest(token);
        createHTMLListOfProducts(listOfProduct);
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
      createHTMLListOfProducts(listOfProduct);
    }
  };

  const handleSortClick = async (event: React.MouseEvent) => {
    setIsLoading(true);
    const token = getCookie('accessToken') as string;
    let listOfProducts: IProducts[] = [];
    const target = event.currentTarget.innerHTML;
    setNameSorting(target);
    switch (target) {
      case 'By price low to high':
        listOfProducts = await sortAllProductsRequest(
          token,
          'price asc',
          activeCategory,
        );
        break;
      case 'By price high to low':
        listOfProducts = await sortAllProductsRequest(
          token,
          'price desc',
          activeCategory,
        );
        break;
      case 'By name A-Z':
        listOfProducts = await sortAllProductsRequest(
          token,
          'name.en-US asc',
          activeCategory,
        );
        break;
      case 'By name Z-A':
        listOfProducts = await sortAllProductsRequest(
          token,
          'name.en-US desc',
          activeCategory,
        );
        break;
    }
    createHTMLListOfProducts(listOfProducts);
  };

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
          value={nameSorting}
          inputName={'sort-select-tag'}
          onClick={(event) => handleSortClick(event)}
          arrow={arrow}
        />
      </div>
      <div className={'wrapper-content'}>
        <Filter
          onFilterChange={() => {
            console.log(1);
          }}
        />
        {isLoading ? (
          <div className={'loading'}>Loading...</div>
        ) : (
          <div className={'wrapper-products'}>{productData}</div>
        )}
      </div>
    </>
  );
};

export default ListOfProductsWithNavigation;
