import React, { FC } from 'react';

import './_ProductDescription.scss';
import Button from '../../shared/components/Button/Button';
import Like from '../../shared/components/Like/Like';

interface ProductDescriptionProps {
  inner: string;
  description: string;
  discount: string;
  price: string;
}

const ProductDescription: FC<ProductDescriptionProps> = ({
  inner,
  description,
  discount,
  price,
}) => {
  return (
    <div className={'product-description'}>
      <div>
        <h2>{inner}</h2>
        <p>{description}</p>
      </div>
      <div>
        <div className={'price-container'}>
          <div>
            {discount ? (
              <div className={'wrapper-prices'}>
                <span className={'new-price'}>${discount}</span>
                <span className={'old-price'}>${price}</span>
              </div>
            ) : (
              <span className={'price'}>${price}</span>
            )}
          </div>
          <Like />
        </div>
        <Button
          className={'buy-now-button'}
          data={'Buy Now'}
          onClick={() => console.log('buy')}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
