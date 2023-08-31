import React, { useEffect, useState } from 'react';

import Button from '../../shared/components/Button/Button';
import {
  CATEGORIES_OF_PRODUCTS as categories,
  IButtonNavigation,
  PRODUCTS_SORT_DATA as sortArray,
} from '../../constants/productsConstant/productsConstants';
import arrow from '../../assets/icons/down-arrow-black.png';
import SelectTag from '../../shared/components/SelectTag/SelectTag';
import './_ListOfProductsWithNavigation.scss';
import ProductCard from '../../entities/ProductCard/ProductCard';
import { getAccessToken } from '../SignUpSection/usage/ApiRegistration';
import setToken from '../../shared/cookie/setToken';
import getCookie from '../../shared/cookie/getCookie';
import Filter, { Filters } from '../../entities/Filtering/Filtering';

import {
  AllProductsRequest,
  filterProductsRequest,
  getCategory,
  IProducts,
} from './ApiProduct';

export interface AllFilters {
  category: string;
  priceMin: number;
  priceMax: number;
  difficulty: string;
  duration: string;
  search: string;
  sorting: string;
}

export const initialAllFilters: AllFilters = {
  category: '',
  priceMin: 0,
  priceMax: 1000,
  difficulty: '',
  duration: '',
  search: '',
  sorting: '',
};

const ListOfProductsWithNavigation = () => {
  const [productData, setProductData] = useState<JSX.Element[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [nameSorting, setNameSorting] = useState('Sorting');
  const [activeFilters, setFilters] = useState(initialAllFilters);

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
    const token = getCookie('accessToken') as string;
    const category = categories.find(
      (item) => item.data === data,
    ) as IButtonNavigation;
    let newFilters;
    if (category.value) {
      const id = await getCategory(token, category.value);
      newFilters = { ...activeFilters, category: id };
    } else {
      newFilters = { ...activeFilters, category: '' };
    }
    setFilters(newFilters);
    const listOfProducts = await filterProductsRequest(newFilters, token);
    createHTMLListOfProducts(listOfProducts);
  };

  const handleSortClick = async (event: React.MouseEvent) => {
    setIsLoading(true);
    const token = getCookie('accessToken') as string;
    const target = event.currentTarget.innerHTML;
    setNameSorting(target);
    const newFilters = { ...activeFilters, sorting: target };
    setFilters(newFilters);
    const listOfProducts = await filterProductsRequest(newFilters, token);
    createHTMLListOfProducts(listOfProducts);
  };

  const handleFilteringClick = async (obj: Filters) => {
    const newFilters = {
      ...obj,
      category: activeFilters.category,
      sorting: activeFilters.sorting,
    };
    setFilters(newFilters);
    setIsLoading(true);
    const token = getCookie('accessToken') as string;
    const listOfProducts = await filterProductsRequest(newFilters, token);
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
        <Filter onFilterChange={handleFilteringClick} />
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
