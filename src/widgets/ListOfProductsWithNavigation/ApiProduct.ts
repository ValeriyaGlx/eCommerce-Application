import { createFilterString } from './components/createUrlFilterString';
import { AllFilters } from './ListOfProductsWithNavigation';

const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

export interface IProducts {
  id: number;
  key: string;
  name: string;
  image: string;
  description: string;
  price: string;
  discount?: string;
  difficulty: string;
  duration: number;
}

interface IResponseAll {
  key: string;
  masterData: {
    published: boolean;
    current: {
      name: {
        'en-US': string;
      };
      description: {
        'en-US': string;
      };
      categories: [];
      categoryOrderHints: NonNullable<unknown>;
      slug: {
        'en-US': string;
      };
      metaTitle: {
        'en-US': string;
      };
      metaDescription: {
        'en-US': string;
      };
      masterVariant: {
        id: number;
        sku: string;
        key: string;
        prices: [
          {
            id: string;
            discounted: {
              value: {
                centAmount: number;
              };
            };
            value: {
              type: string;
              currencyCode: string;
              centAmount: number;
              fractionDigits: number;
            };
            key: string;
            country: string;
          },
        ];
        images: [
          {
            url: string;
            label: string;
            dimensions: {
              w: number;
              h: number;
            };
          },
        ];
        attributes: [];
        assets: [];
      };
      variants: [];
      searchKeywords: NonNullable<unknown>;
    };
    staged: {
      masterVariant: {
        images: [
          {
            url: string;
            label: string;
          },
        ];
        prices: [
          {
            id: string;
            value: {
              type: string;
              currencyCode: string;
              centAmount: number;
              fractionDigits: number;
            };
          },
        ];
      };
    };
  };
}

export interface IResponseCategory {
  published: boolean;
  key: string;
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  masterVariant: {
    images: [
      {
        url: string;
      },
    ];
    attributes: [];
    prices: [
      {
        value: {
          centAmount: number;
        };
        discounted: {
          value: {
            centAmount: number;
          };
        };
      },
    ];
  };
}

function processDataAllProducts(arr: Array<IResponseAll>) {
  const newArr: IProducts[] = [];

  arr.forEach((el: IResponseAll) => {
    const attrArray: Array<{
      name: string;
      value: Array<string> | number;
    }> = el.masterData.current.masterVariant.attributes;

    if (el.masterData.published) {
      const obj: IProducts = {
        id: Math.random(),
        key: el.key,
        name: el.masterData.current.name['en-US'],
        description: el.masterData.current.description['en-US'],
        image: el.masterData.staged.masterVariant.images[0].url,
        price: (el.masterData.staged.masterVariant.prices[0].value.centAmount / 100).toFixed(2),
        duration: attrArray[1].value as number,
        difficulty: Array.isArray(attrArray[0].value) ? attrArray[0].value[0] : '',
      };
      if (el.masterData.current.masterVariant.prices[0].discounted) {
        obj.discount = (el.masterData.current.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2);
      }

      newArr.push(obj);
    }
  });
  return newArr;
}

function processDataCategoryProducts(arr: Array<IResponseCategory>) {
  const newArr: IProducts[] = [];

  arr.forEach((el: IResponseCategory) => {
    if (el.published) {
      const attrsArray: Array<{
        name: string;
        value: Array<string> | number;
      }> = el.masterVariant.attributes;

      const obj: IProducts = {
        id: Math.random(),
        key: el.key,
        name: el.name['en-US'],
        description: el.description['en-US'],
        image: el.masterVariant.images[0].url,
        price: (el.masterVariant.prices[0].value.centAmount / 100).toFixed(2),
        difficulty: Array.isArray(attrsArray[0].value) ? attrsArray[0].value[0] : '',
        duration: attrsArray[1].value as number,
      };
      if (el.masterVariant.prices[0].discounted) {
        obj.discount = (el.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2);
      }
      newArr.push(obj);
    }
  });
  return newArr;
}

export async function AllProductsRequest(token: string) {
  const urlRequest = `${host}/${project}/products/`;
  const authHeader = 'Bearer ' + token;

  const response = await fetch(urlRequest, {
    method: 'GET',
    headers: {
      Authorization: authHeader,
    },
  });
  const products = await response.json();

  const arr = products.results;

  return processDataAllProducts(arr);
}

export async function getCategory(token: string, category: string) {
  const urlRequestCategory = `${host}/${project}/categories/key=${category}`;

  const responseCategory = await fetch(urlRequestCategory, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const objCategory = await responseCategory.json();
  return objCategory.id;
}

export async function getCategories(token: string) {
  const urlRequestCategory = `${host}/${project}/categories/`;

  const responseCategory = await fetch(urlRequestCategory, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const objCategory = await responseCategory.json();
  return objCategory.results;
}

export async function filterProductsRequest(obj: AllFilters, token: string) {
  const pathUrl = createFilterString(obj);

  const urlRequestProducts = `${host}/${project}/product-projections/search?${pathUrl}`;

  const responseProducts = await fetch(urlRequestProducts, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const products = await responseProducts.json();
  const arr = products.results;
  return processDataCategoryProducts(arr);
}
