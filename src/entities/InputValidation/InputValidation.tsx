import React, { FC } from 'react';

import logoVisible from '../../assets/icons/visible.png';
import './InputValidation.css';

interface InputValidationProps {
  type: string;
  placeholder: string;
  logo?: typeof logoVisible;
}

const InputValidation: FC<InputValidationProps> = ({
  type,
  placeholder,
  logo,
}) => {
  return (
    <React.Fragment>
      <div className={'input-area'}>
        {logo && <img src={logo} />}
        <input type={type} placeholder={placeholder} />
        {type === 'password' && (
          <button className={'show-password'}>
            <img className={'password-visible'} src={logoVisible} alt={'eye'} />
          </button>
        )}
      </div>
      <div className={'error-message'}></div>
    </React.Fragment>
  );
};

export default InputValidation;
