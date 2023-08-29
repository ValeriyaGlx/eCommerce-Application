import React, { FC } from 'react';

import logoVisible from '../../../assets/icons/visible.png';
import './_InputValidation.scss';

interface InputValidationProps {
  type: string;
  placeholder: string;
  inputName: string;
  logo?: typeof logoVisible;
  showPassword?: (e: React.MouseEvent) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errorMessage: string | null;
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  color: string;
  errorClass: string;
  styles?: string;
}

const InputValidation: FC<InputValidationProps> = ({
  type,
  placeholder,
  logo,
  showPassword,
  handleInputChange,
  onBlur,
  errorMessage,
  value,
  inputName,
  min,
  color,
  errorClass,
  styles,
}) => {
  return (
    <React.Fragment>
      <div
        className={`input-area ${errorClass} ${
          styles === undefined ? '' : styles
        }`}
      >
        {logo && <img className={'input-logo'} src={logo} alt={'icon'} />}
        <input
          type={type}
          placeholder={placeholder}
          name={inputName}
          value={value}
          onBlur={onBlur}
          onChange={handleInputChange}
          min={min}
        />
        {type === 'password' && (
          <button className={'show-password'} onClick={showPassword}>
            <img className={'password-visible'} src={logoVisible} alt={'eye'} />
          </button>
        )}
      </div>
      <div className={`error-message ${color}`}>{errorMessage}</div>
    </React.Fragment>
  );
};

export default InputValidation;
