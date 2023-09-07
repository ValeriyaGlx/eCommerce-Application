import React, { useEffect, useState } from 'react';

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
import CategoryNavigation from '../../features/CategoryNavigation/CategoryNavigation';
import SubcategoryNavigation from '../../features/SubcategoryNavigation/SubcategoryNavigation';
import iconSetting from '../../assets/icons/equalizer-line.svg';
import ShoppingCartButton from '../../shared/components/ShoppingCardButton/ShoppingCartButton';

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

interface ListOfProductsWithNavigationProps {
  category: string;
  subCategory?: string;
}

const ListOfProductsWithNavigation: React.FC<
  ListOfProductsWithNavigationProps
> = ({ category, subCategory }) => {
  const [productData, setProductData] = useState<JSX.Element[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nameSorting, setNameSorting] = useState('Sorting');
  const [activeFilters, setFilters] = useState(initialAllFilters);
  const [isOpenFilters, setIsOpenFilters] = useState(false);

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
            productId={product.productId}
          />
        ),
      );
      setIsLoading(false);
      setProductData(productJSX);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const menuIcon = document.querySelector('.filtering_list') as HTMLElement;
    const settingButton = document.querySelector(
      '.button-setting',
    ) as HTMLElement;
    const modal1 = event.composedPath().includes(menuIcon);
    const modal2 = event.composedPath().includes(settingButton);
    if (!modal1 && !modal2) setIsOpenFilters(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await getAccessToken();
        const token = tokenResponse.access_token;
        setToken('accessToken', token);
        if (category === 'All Categories') {
          const listOfProduct = await filterProductsRequest(
            activeFilters,
            token,
          );
          createHTMLListOfProducts(listOfProduct);
        } else if (subCategory === undefined) {
          const categoryObj = categories.find(
            (item) => item.data === category,
          ) as IButtonNavigation;
          const id = await getCategory(token, categoryObj.value);
          const newFilters = { ...activeFilters, category: id };
          setFilters(newFilters);
          const listOfProducts = await filterProductsRequest(newFilters, token);
          createHTMLListOfProducts(listOfProducts);
        } else {
          const id = await getCategory(token, subCategory);
          const newFilters = { ...activeFilters, category: id };
          setFilters(newFilters);
          const listOfProducts = await filterProductsRequest(newFilters, token);
          createHTMLListOfProducts(listOfProducts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
    if (isOpenFilters) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpenFilters]);

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
        {category === 'All Categories' && subCategory === undefined ? (
          <CategoryNavigation />
        ) : subCategory === undefined ? (
          <SubcategoryNavigation category={category} />
        ) : null}
        <div className={'wrapper-buttons'}>
          <SelectTag
            selectArray={sortArray}
            className={'sort-select'}
            value={nameSorting}
            inputName={'sort-select-tag'}
            onClick={(event) => handleSortClick(event)}
            arrow={arrow}
          />
          <ShoppingCartButton
            className={'icon-cart button-setting'}
            src={iconSetting}
            onClick={() => {
              setIsOpenFilters(!isOpenFilters);
            }}
          />
        </div>
      </div>
      <div className={'wrapper-content'}>
        <Filter
          className={`filtering_list ${isOpenFilters ? 'open' : ''}`}
          onFilterChange={handleFilteringClick}
          onClickCloseButton={() => setIsOpenFilters(false)}
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
