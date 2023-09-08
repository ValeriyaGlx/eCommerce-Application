import React, { FC, useEffect, useState } from 'react';
import './_ShoppingCartButton.scss';

interface ButtonProps {
  className: string;
  onClick: (event: React.MouseEvent) => void;
  data?: string;
  isDisabled: boolean;
}

const ShoppingCartButton: FC<ButtonProps> = ({
  className,
  onClick,
  data,
  isDisabled,
}) => {
  const [localIsDisabled, setLocalIsDisabled] = useState(false);

  useEffect(() => {
    setLocalIsDisabled(isDisabled);
  }, [isDisabled]);

  return (
    <button className={className} onClick={onClick} disabled={localIsDisabled}>
      {data}
    </button>
  );
};

export default ShoppingCartButton;
