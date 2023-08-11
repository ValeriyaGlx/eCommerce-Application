import React, { FC } from 'react';

import logoVisible from '../../assets/icons/visible.png';
import './InputValidation.scss';

interface InputValidationProps {
  type: string;
  placeholder: string;
  logo?: typeof logoVisible;
  showPassword?: (e: React.MouseEvent) => void;
}

const InputValidation: FC<InputValidationProps> = ({
  type,
  placeholder,
  logo,
  showPassword,
}) => {
  return (
    <React.Fragment>
      <div className={'input-area'}>
        {logo && <img className={'input-logo'} src={logo} />}
        <input type={type} placeholder={placeholder} />
        {type === 'password' && (
          <button className={'show-password'} onClick={showPassword}>
            <img className={'password-visible'} src={logoVisible} alt={'eye'} />
          </button>
        )}
      </div>
      <div className={'error-message'}></div>
    </React.Fragment>
  );
};

export default InputValidation;
