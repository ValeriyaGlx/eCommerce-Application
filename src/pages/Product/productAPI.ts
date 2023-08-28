const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

interface IProductDataProps {
  name: string;
  description: string;
  prices: number;
  images: { url: string }[];
  discount?: number;
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
    prices: res.masterVariant.prices[0].value.centAmount,
    images: res.masterVariant.images,
  };

  if (res.masterVariant.prices[0].discounted) {
    productData.discount = res.masterVariant.prices[0].discounted.value.centAmount;
    console.log(res.masterVariant.prices[0].discounted.value.centAmount);
  }
  return productData;
}
