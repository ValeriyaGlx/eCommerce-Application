import React, { FC } from 'react';

import logoVisible from '../../assets/icons/icon-heart.svg';
import InputValidation from '../../shared/components/InputValidation/InputValidation';

interface InputValidationPasswordCurrentProps {
  type: string;
  placeholder: string;
  inputName: string;
  logo?: typeof logoVisible;
  showPassword?: (e: React.MouseEvent) => void;
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  styles?: string;
  readonly?: boolean;
}

const InputValidationPasswordCurrent: FC<
  InputValidationPasswordCurrentProps
> = ({
  type,
  placeholder,
  showPassword,
  onBlur,
  inputName,
  min,
  styles,
  readonly,
}) => {
  return (
    <InputValidation
      errorClass={''}
      type={type}
      placeholder={placeholder}
      inputName={inputName}
      showPassword={showPassword}
      onBlur={onBlur}
      min={min}
      handleInputChange={() => {}}
      errorMessage={''}
      color={''}
      styles={styles}
      readonly={readonly}
    />
  );
};

export default InputValidationPasswordCurrent;
