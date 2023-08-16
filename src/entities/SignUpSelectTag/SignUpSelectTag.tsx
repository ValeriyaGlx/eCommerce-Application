import React, { FC } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import SelectTag from '../../shared/components/SelectTag/SelectTag';
import {
  setInputValidationError,
  setSelectValue,
} from '../../app/store/signupActions/sugnupSlice';
import { store } from '../../app/store/store';
import arrow from '../../assets/icons/down-arrow-black.png';
import { setInputValueWithValidation } from '../../app/store/signupActions/signupActions';

interface SignUpSelectTagProps {
  selectArray: { value: string; data: string; id: number }[];
  className: string;
  inputName: string;
}

type RootState = ReturnType<typeof store.getState>;

const SignUpSelectTag: FC<SignUpSelectTagProps> = ({
  selectArray,
  className,
  inputName,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const inputState = useSelector(
    (state: RootState) => state.signup.countries[inputName],
  );

  function chooseCountry(e: React.MouseEvent) {
    const newValue = (e.target as HTMLElement).textContent as string;
    dispatch(setSelectValue({ inputName, newValue }));

    const countriesCode = ['shipping_code', 'billing_code'];
    countriesCode.forEach((el) => {
      const postalCode = store.getState().signup.signup[el].value;
      dispatch(setInputValueWithValidation(el, postalCode));
    });
  }

  return (
    <SelectTag
      selectArray={selectArray}
      className={className}
      inputName={inputName}
      value={inputState}
      onClick={chooseCountry}
      arrow={arrow}
    />
  );
};

export default SignUpSelectTag;
