import getCookie from '../../shared/cookie/getCookie';
import {
  AllProductsRequest,
  CategoryProductsRequest,
  IProducts,
} from '../../widgets/ListOfProductsWithNavigation/ApiProduct';

export const PRODUCTS_SORT_DATA = [
  {
    value: 'Price low to high',
    data: 'By price low to high',
    id: Math.random(),
  },
  {
    value: 'Price high to low',
    data: 'By price high to low',
    id: Math.random(),
  },
  {
    value: 'Name A-Z',
    data: 'By name A-Z',
    id: Math.random(),
  },
  {
    value: 'Name Z-A',
    data: 'By name Z-A',
    id: Math.random(),
  },
];

interface IButtonNavigation {
  data: string;
  id: number;
  onclick: () => Promise<Array<IProducts>> | undefined;
}

export const CATEGORIES_OF_PRODUCTS: Array<IButtonNavigation> = [
  {
    data: 'All Categories',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('accessToken');
      if (token) {
        return AllProductsRequest(token);
      }
    },
  },
  {
    data: 'Free',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('accessToken');
      if (token) {
        return CategoryProductsRequest(token, 'free');
      }
    },
  },

  {
    data: 'Programming',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('accessToken');
      if (token) {
        return CategoryProductsRequest(token, 'programming');
      }
    },
  },

  {
    data: 'Data analysis',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('accessToken');
      if (token) {
        return CategoryProductsRequest(token, 'dataanalysis');
      }
    },
  },

  {
    data: 'Design',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('accessToken');
      if (token) {
        return CategoryProductsRequest(token, 'design');
      }
    },
  },

  {
    data: 'Management',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('accessToken');
      if (token) {
        return CategoryProductsRequest(token, 'management');
      }
    },
  },
];
