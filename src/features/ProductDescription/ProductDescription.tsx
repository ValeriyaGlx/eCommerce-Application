import { FC } from 'react';

import heart from '../../assets/icons/icon-heart-black.svg';
import './_ProductDescription.scss';
import Button from '../../shared/components/Button/Button';

interface ProductDescriptionProps {
  inner: string;
  description: string;
}

const ProductDescription: FC<ProductDescriptionProps> = ({
  inner,
  description,
}) => {
  return (
    <div className={'product-description'}>
      <div>
        <h2>{inner}</h2>
        <p>{description}</p>
      </div>
      <div>
        <div className={'price-container'}>
          <div>$50</div>
          <img src={heart} alt={heart} />
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
