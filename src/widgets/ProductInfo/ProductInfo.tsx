import React, { FC } from 'react';

import ProductImageSlider from '../../features/ProductImageSlider/ProductImageSlider';
import ProductDescription from '../../features/ProductDescription/ProductDescription';

interface ProductInfoProps {
  product: {
    name: string;
    description: string;
    images: Array<{ url: string }>;
    prices: string;
  };
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const items: React.ReactNode[] = [];

  product.images.forEach((el, i) => {
    items.push(<img className='item' data-value={i + 1} src={el.url} />);
  });

  return (
    <>
      <ProductImageSlider items={items} />
      <ProductDescription />
    </>
  );
};

export default ProductInfo;
