import React, { FC } from 'react';

import ProductImageSlider from '../../features/ProductImageSlider/ProductImageSlider';
import ProductDescription from '../../features/ProductDescription/ProductDescription';
import './_ProductInfo.scss';

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
    <section className={'product-info_container'}>
      <ProductImageSlider items={items} />
      <ProductDescription
        inner={product.name}
        description={product.description}
      />
    </section>
  );
};

export default ProductInfo;
