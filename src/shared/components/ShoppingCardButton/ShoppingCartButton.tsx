import React, { FC } from 'react';
import './_ShoppingCartButton.scss';

interface ButtonProps {
  className: string;
  src: string;
  onClick: (event: React.MouseEvent) => void;
}

const ShoppingCartButton: FC<ButtonProps> = ({ className, src, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <img className={'shopping-img-cart'} src={src} alt={'cart'} />
    </button>
  );
};

export default ShoppingCartButton;
