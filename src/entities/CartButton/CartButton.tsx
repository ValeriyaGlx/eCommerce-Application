import React from 'react';
import './CartButton.scss';

interface CartButtonProps {
  src: string;
  alt: string;
}

export function CartButton(props: CartButtonProps) {
  return (
    <button className='button-cart'>
      <span className='span-cart'>0</span>
      <img className='img-cart' src={props.src} alt={props.alt} />
    </button>
  );
}
