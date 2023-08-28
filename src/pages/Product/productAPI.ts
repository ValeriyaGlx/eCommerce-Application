const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

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

  const productData = {
    name: res.name['en-US'],
    description: res.description['en-US'],
    prices: '100',
    images: res.masterVariant.images,
  };

  return productData;
}
