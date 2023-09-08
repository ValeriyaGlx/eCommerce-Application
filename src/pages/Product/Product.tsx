import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import PageNotFound from '../PageNotFound/PageNotFound';
import { getAccessToken } from '../../widgets/SignUpSection/usage/ApiRegistration';
import ProductInfo from '../../widgets/ProductInfo/ProductInfo';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner/LoadingSpinner';

import { getProduct } from './productAPI';

const Product = () => {
  const [pageFound, setPageFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    images: [{ url: '' }],
    prices: '',
    difficulty: '',
    duration: NaN,
    productId: '',
  });

  const { productId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await getAccessToken();
        const token = tokenResponse.access_token;
        const product = await getProduct(productId as string, token);
        if (!product) {
          setPageFound(false);
        } else {
          setProductInfo(product);
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
    return (
      <div className={'wrapper-spinner'}>
        <LoadingSpinner />
      </div>
    );
  } else {
    return (
      <>
        {!pageFound && <PageNotFound />}
        {pageFound && (
          <div>
            <ProductInfo product={productInfo} />
          </div>
        )}
      </>
    );
  }
};

export default Product;
