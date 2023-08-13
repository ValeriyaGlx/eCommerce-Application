import React, { FC } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import SelectTag from '../../entities/SelectTag/SelectTag';
import { setSelectValue } from '../../app/store/validationActions/sugnupSlice';
import { store } from '../../app/store/store';

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
    (state: RootState) => state.inputs.countries[inputName],
  );

  function chooseCountry(e: React.MouseEvent) {
    const newValue = (e.target as HTMLElement).textContent as string;
    dispatch(setSelectValue({ inputName, newValue }));
  }

  return (
    <SelectTag
      selectArray={selectArray}
      className={className}
      inputName={inputName}
      value={inputState}
      onClick={chooseCountry}
    />
  );
};

export default SignUpSelectTag;
