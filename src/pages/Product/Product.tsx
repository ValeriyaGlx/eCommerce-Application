import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import PageNotFound from '../PageNotFound/PageNotFound';
import { getAccessToken } from '../../widgets/SignUpSection/usage/ApiRegistration';

import { getProduct } from './productAPI';

const Product = () => {
  const [pageFound, setPageFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { productId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await getAccessToken();
        const token = tokenResponse.access_token;
        const product = await getProduct(productId as string, token);
        if (!product) {
          setPageFound(false);
        }

        setIsLoading(false);
        return product;
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {!pageFound && <PageNotFound />}
        {pageFound && <div>Hi Im Page {productId}</div>}
      </>
    );
  }
};

export default Product;
