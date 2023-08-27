import ProductImageSlider from '../../features/ProductImageSlider/ProductImageSlider';
import ProductDescription from '../../features/ProductDescription/ProductDescription';
import React, { FC } from 'react';
import product from '../../pages/Product/Product';

interface ProductInfoProps {
  product: {
    name: string;
    description: string;
    images: Array<{ url: string }>;
    prices: string;
  };
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  console.log(product.images[0].url);
  const items = [
    <img className='item' data-value='1' src={product.images[0].url} />,
    <img className='item' data-value='2' src={product.images[1].url} />,
    <img className='item' data-value='3' src={product.images[2].url} />,
  ];
  return (
    <>
      <ProductImageSlider items={items} />
      <ProductDescription />
    </>
  );
};

export default ProductInfo;
