import React, { FC } from 'react';
import './_CartButton.scss';
import { Link } from 'react-router-dom';

interface CartButtonProps {
  src: string;
  alt: string;
  to: string;
}

export const CartButton: FC<CartButtonProps> = ({ src, alt, to }) => {
  return (
    <Link className='button-cart' to={to}>
      <span className='span-cart'>0</span>
      <img className='img-cart' src={src} alt={alt} />
    </Link>
  );
};
