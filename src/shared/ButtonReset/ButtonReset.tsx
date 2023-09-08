import React, { FC } from 'react';

interface ButtonProps {
  className: string;
  src: string;
  onClick: () => void;
}

const ButtonReset: FC<ButtonProps> = ({ className, src, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <img className={'shopping-img-cart'} src={src} alt={'cart'} />
    </button>
  );
};

export default ButtonReset;
