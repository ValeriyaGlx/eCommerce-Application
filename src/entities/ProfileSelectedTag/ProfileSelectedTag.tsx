import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import SelectTag from '../../shared/components/SelectTag/SelectTag';
import { store } from '../../app/store/store';
import arrow from '../../assets/icons/down-arrow-black.png';

interface ProfileSelectTagProps {
  selectArray: { value: string; data: string; id: number }[];
  className: string;
  inputName: string;
  addressId: string;
}

type RootState = ReturnType<typeof store.getState>;
type AddressId = keyof RootState['profileAddresses'];

interface AddressState {
  value: string;
  validationError: string;
  country?: string;
}

type ProfileState =
  | Record<string, AddressState>
  | Record<string, Record<string, AddressState>>;

const ProfileSelectTag: FC<ProfileSelectTagProps> = ({
  selectArray,
  className,
  inputName,
  addressId,
}) => {
  const inputStateRender: ProfileState = useSelector(
    (state: RootState) => state.profileAddresses[addressId as AddressId],
  );

  function chooseCountry(e: React.MouseEvent) {
    const newValue = (e.target as HTMLElement).textContent as string;
    console.log(newValue);
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
    />
  );
};

export default ProfileSelectTag;
