const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

export interface IProducts {
  id: number;
  key: string;
  name: string;
  image: string;
  description: string;
  price: number;
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

interface IResponseCategory {
  published: boolean;
  id: string;
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
    prices: [
      {
        value: {
          centAmount: number;
        };
        discounted: {
          value: {
            centAmount: 22500;
          };
        };
      },
    ];
  };
}

function processDataAllProducts(arr: Array<IResponseAll>) {
  const newArr: IProducts[] = [];

  arr.forEach((el: IResponseAll) => {
    if (el.masterData.published) {
      const obj: IProducts = {
        id: Math.random(),
        key: el.key,
        name: el.masterData.current.name['en-US'],
        description: el.masterData.current.description['en-US'],
        image: el.masterData.staged.masterVariant.images[0].url,
        price: Math.ceil(el.masterData.staged.masterVariant.prices[0].value.centAmount / 100),
      };

      newArr.push(obj);
    }
  });
  return newArr;
}

function processDataCategoryProducts(arr: Array<IResponseCategory>) {
  const newArr: IProducts[] = [];

  arr.forEach((el: IResponseCategory) => {
    if (el.published) {
      const obj: IProducts = {
        id: Math.random(),
        key: el.id,
        name: el.name['en-US'],
        description: el.description['en-US'],
        image: el.masterVariant.images[0].url,
        price: Math.ceil(el.masterVariant.prices[0].value.centAmount / 100),
      };

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

export async function CategoryProductsRequest(token: string, category: string) {
  const urlRequestCategory = `${host}/${project}/categories/key=${category}`;

  const responseCategory = await fetch(urlRequestCategory, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const objCategory = await responseCategory.json();
  const idCategory = objCategory.id;

  const urlRequestProducts = `${host}/${project}/product-projections/search?filter=categories.id:"${idCategory}"`;

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
