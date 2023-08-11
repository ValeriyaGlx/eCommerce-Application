import React, { FC } from 'react';

import logoVisible from '../../assets/icons/visible.png';
import './_InputValidation.scss';

interface InputValidationProps {
  type: string;
  placeholder: string;
  logo?: typeof logoVisible;
  showPassword?: (e: React.MouseEvent) => void;
  handleInputChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
  errorMessage?: string;
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const InputValidation: FC<InputValidationProps> = ({
  type,
  placeholder,
  logo,
  showPassword,
  handleInputChange,
  value,
  onBlur,
  errorMessage,
}) => {
  return (
    <React.Fragment>
      <div className={'input-area'}>
        {logo && <img className={'input-logo'} src={logo} alt={'icon'} />}
        <input
          type={type}
          placeholder={placeholder}
          onInput={handleInputChange}
          value={value}
          onBlur={onBlur}
        />
        {type === 'password' && (
          <button className={'show-password'} onClick={showPassword}>
            <img className={'password-visible'} src={logoVisible} alt={'eye'} />
          </button>
        )}
      </div>
      <div className={'error-message'}>{errorMessage}</div>
    </React.Fragment>
  );
};

export default InputValidation;
