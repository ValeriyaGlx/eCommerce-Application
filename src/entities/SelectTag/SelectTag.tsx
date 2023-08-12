import React, { ChangeEvent, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './_SelectTag.scss';
import arrow from '../../assets/icons/down-arrow-black.png';
import { setSelectValue } from '../../app/store/validationActions/sugnupSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { store } from '../../app/store/store';

interface SelectTagProps {
  defaultData: string;
  selectArray: { value: string; data: string; id: number }[];
  className: string;
  openDropDown: (e: React.MouseEvent) => void;
  value?: string;
  inputName: string;
}

type RootState = ReturnType<typeof store.getState>;

const SelectTag: FC<SelectTagProps> = ({
  selectArray,
  className,
  openDropDown,
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
    <div className={['dropdown', className].join(' ')} onClick={openDropDown}>
      <div className={'select'}>
        <span>{inputState}</span>
        <img src={arrow} alt={'arrow'} />
      </div>
      <input type='hidden' value={inputState} name={inputName} />
      <ul className={'dropdown-menu'}>
        {selectArray.map(({ value, data, id }) => (
          <li key={id} value={value} onClick={chooseCountry}>
            {data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectTag;
