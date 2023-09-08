import React from 'react';
import { useNavigate } from 'react-router-dom';

import './_ProductCard.scss';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';
import cart from '../../assets/icons/shopping-cart-fill.svg';
import ShoppingCartButton from '../../shared/components/ShoppingCardButton/ShoppingCartButton';
import Like from '../../shared/components/Like/Like';

interface ProductCardProps {
  key: number;
  path: string;
  imageUrl: string;
  productName: string;
  description: string;
  price: string;
  discount?: string;
  difficulty: string;
  duration: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  path,
  imageUrl,
  productName,
  description,
  price,
  discount,
  difficulty,
  duration,
}) => {
  const navigate = useNavigate();

  function clickCard(event: React.MouseEvent) {
    const currentTarget = event.target as HTMLElement;
    if (currentTarget.parentElement?.className !== 'icon-cart') {
      navigate(`/products/product/${path}`);
    }
  }

  return (
    <div className='product-card' onClick={clickCard}>
      <img src={imageUrl} alt={productName} className={'product-card-img'} />
      <div className='hover-content'>
        <ButtonWithRoute
          className={'button-link'}
          path={`/products/product/${path}`}
          data={'More detailed'}
        />
        <ShoppingCartButton
          className={'icon-cart'}
          src={cart}
          onClick={() => console.log(1)}
        />
      </div>
      <h3>{productName}</h3>
      <div className={'product-card-attrs-container'}>
        <span>{duration} weeks</span>
        <span
          className={`product-card-icon-difficulty icon-difficulty-${difficulty}`}
        ></span>
      </div>
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
        <Like />
      </div>
    </div>
  );
};

export default ProductCard;
