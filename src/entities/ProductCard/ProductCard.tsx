import React from 'react';

import './_ProductCard.scss';
import heart from '../../assets/icons/icon-heart-black.svg';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';
import cart from '../../assets/icons/shopping-cart-fill.svg';
import ShoppingCartButton from '../../shared/components/ShoppingCardButton/ShoppingCartButton';

interface ProductCardProps {
  key: number;
  path: string;
  imageUrl: string;
  productName: string;
  description: string;
  price: string;
  discount?: string;
}

function clickCard() {
  console.log(1);
}

const ProductCard: React.FC<ProductCardProps> = ({
  path,
  imageUrl,
  productName,
  description,
  price,
  discount,
}) => {
  return (
    <div className='product-card'>
      <img src={imageUrl} alt={productName} className={'product-card-img'} />
      <div className='hover-content'>
        <ButtonWithRoute
          className={'button-link'}
          path={`/products/${path}`}
          data={'More detailed'}
        />
        <ShoppingCartButton
          className={'icon-cart'}
          src={cart}
          onClick={clickCard}
        />
      </div>
      <h3>{productName}</h3>
      <p>{description}</p>
      <div className={'product-card-container'}>
        {discount ? (
          <div className={'wrapper-prices'}>
            <span className={'new-price'}>${discount}</span>
            <span className={'old-price'}>${price}</span>
          </div>
        ) : (
          <span className={'price'}>${price}</span>
        )}
        <img src={heart} alt={'heart'} />
      </div>
    </div>
  );
};

export default ProductCard;
