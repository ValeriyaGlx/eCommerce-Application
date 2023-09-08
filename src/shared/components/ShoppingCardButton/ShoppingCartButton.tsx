import React, { FC } from 'react';
import './_ShoppingCartButton.scss';
import { useDispatch, useSelector } from 'react-redux';

import { store } from '../../../app/store/store';

interface ButtonProps {
  className: string;
  src: string;
  onClick: (event: React.MouseEvent) => void;
  productId: string;
}

type RootState = ReturnType<typeof store.getState>;

const ShoppingCartButton: FC<ButtonProps> = ({
  className,
  src,
  onClick,
  productId,
}) => {
  useDispatch();
  const productsInCart = useSelector(
    (state: RootState) => state.cart.productsInCart,
  );
  const isProductInCart = productsInCart.includes(productId);

  return (
    <button className={className} onClick={onClick} disabled={isProductInCart}>
      <img className={'shopping-img-cart'} src={src} alt={'cart'} />
    </button>
  );
};

export default ShoppingCartButton;
