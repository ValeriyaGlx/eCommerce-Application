const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

interface IProducts {
  id: number;
  key: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

interface IResponse {
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

  const newArr: IProducts[] = [];
  const arr = products.results;

  arr.forEach((el: IResponse) => {
    if (el.masterData.published) {
      const obj: IProducts = {
        id: Math.random(),
        key: el.key,
        name: el.masterData.current.name['en-US'],
        description: el.masterData.current.description['en-US'],
        image: el.masterData.staged.masterVariant.images[0].url,
        price: Math.ceil(
          el.masterData.staged.masterVariant.prices[0].value.centAmount / 100,
        ),
      };
      newArr.push(obj);
    }
  });
  return newArr;
}
