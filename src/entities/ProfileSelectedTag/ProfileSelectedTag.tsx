import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectTag from '../../shared/components/SelectTag/SelectTag';
import { store } from '../../app/store/store';
import arrow from '../../assets/icons/down-arrow-black.png';
import { AppDispatch } from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import { setProfileSelectValue } from '../../app/store/actions/profileAddressesAction/profileAddressesSlice';

interface ProfileSelectTagProps {
  selectArray: { value: string; data: string; id: number }[];
  className: string;
  inputName: string;
  addressId: string;
  readonly: boolean;
}

type RootState = ReturnType<typeof store.getState>;
type AddressId = keyof RootState['profileAddresses'];

const ProfileSelectTag: FC<ProfileSelectTagProps> = ({
  selectArray,
  className,
  inputName,
  addressId,
  readonly,
}) => {
  const inputStateRender = useSelector(
    (state: RootState) => state.profileAddresses[addressId as AddressId],
  );

  const dispatch = useDispatch<AppDispatch>();

  function chooseCountry(e: React.MouseEvent) {
    if (readonly) return;

    const newValue = (e.target as HTMLElement).textContent as string;
    dispatch(setProfileSelectValue({ addressId, newValue }));
  }

  return (
    <SelectTag
      selectArray={selectArray}
      className={className}
      inputName={inputName}
      value={
        inputStateRender
          ? (inputStateRender.withoutValidation.country as string)
          : ''
      }
      onClick={chooseCountry}
      arrow={arrow}
      readonly={readonly}
    />
  );
};

export default ProfileSelectTag;
