import React, { FC } from 'react';

interface CartButtonProps {
  src: string;
  alt: string;
  to: string;
}

export const LinkGit: FC<CartButtonProps> = ({ src, alt, to }) => {
  return (
    <a className='button-cart' href={to} target='_blank'>
      <img className='img-cart' src={src} alt={alt} />
    </a>
  );
};
