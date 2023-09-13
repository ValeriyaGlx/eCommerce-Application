import React, { FC } from 'react';
import './_CartButton.scss';
import { Link } from 'react-router-dom';

interface CartButtonProps {
  src: string;
  alt: string;
  to: string;
  number: string;
}

export const CartButton: FC<CartButtonProps> = ({ src, alt, to, number }) => {
  return (
    <Link className='button-cart' to={to}>
      <span className='span-cart'>{number}</span>
      <img className='img-cart' src={src} alt={alt} />
    </Link>
  );
};
