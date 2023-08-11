import React, { FC, useState } from 'react';

import InputValidation from '../../entities/InputValidation/InputValidation';

interface InputValidationProps {
  type: string;
  placeholder: string;
  valid: (inputValue: string) => string;
  value: string;
  onBlur: (event: React.FormEvent<HTMLInputElement>) => void;
  showPassword?: (e: React.MouseEvent) => void;
}

const InputWithValidation: FC<InputValidationProps> = ({
  type,
  placeholder,
  valid,
  onBlur,
  showPassword,
}) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (inputValue: string) => {
    const message = valid(inputValue);
    setErrorMessage(message);
  };

  const handleValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue: string = event.currentTarget.value;
    setValue(newValue);
    validate(newValue);
  };

  return (
    <div>
      <InputValidation
        type={type}
        placeholder={placeholder}
        value={value}
        showPassword={showPassword}
        handleInputChange={handleValueChange}
        errorMessage={errorMessage}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputWithValidation;
