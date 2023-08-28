import getCookie from '../../shared/cookie/getCookie';
import {
  AllProductsRequest,
  CategoryProductsRequest,
  IProducts,
} from '../../widgets/ListOfProductsWithNavigation/ApiProduct';

export const PRODUCTS_SORT_DATA = [
  {
    value: 'Price',
    data: 'By price',
    id: Math.random(),
  },
  {
    value: 'Time',
    data: 'By time',
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
      const token = getCookie('token');
      if (token) {
        return AllProductsRequest(token);
      }
    },
  },
  {
    data: 'Free',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('token');
      if (token) {
        return CategoryProductsRequest(token, 'free');
      }
    },
  },

  {
    data: 'Programming',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('token');
      if (token) {
        return CategoryProductsRequest(token, 'programming');
      }
    },
  },

  {
    data: 'Data analysis',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('token');
      if (token) {
        return CategoryProductsRequest(token, 'dataAnalysis');
      }
    },
  },

  {
    data: 'Design',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('token');
      if (token) {
        return CategoryProductsRequest(token, 'design');
      }
    },
  },

  {
    data: 'Management',
    id: Math.random(),
    onclick: () => {
      const token = getCookie('token');
      if (token) {
        return CategoryProductsRequest(token, 'management');
      }
    },
  },
];
