const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

export interface IProductDataProps {
  name: string;
  description: string;
  prices: string;
  images: { url: string }[];
  discount?: string;
  difficulty: string;
  duration: number;
  productId: string;
}

export async function getProduct(key: string, token: string) {
  const urlRequest = `${host}/${project}/products/key=${key}`;
  const authHeader = 'Bearer ' + token;

  const response = await fetch(urlRequest, {
    method: 'GET',
    headers: {
      Authorization: authHeader,
    },
  });

  if (response.status === 404) {
    return false;
  }

  const product = await response.json();
  const res = product.masterData.current;

  const productData: IProductDataProps = {
    name: res.name['en-US'],
    description: res.description['en-US'],
    prices: (res.masterVariant.prices[0].value.centAmount / 100).toFixed(2),
    images: res.masterVariant.images,
    difficulty: res.masterVariant.attributes[0].value[0],
    duration: res.masterVariant.attributes[1].value,
    productId: product.id,
  };

  if (res.masterVariant.prices[0].discounted) {
    productData.discount = (res.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2);
  }
  return productData;
}
