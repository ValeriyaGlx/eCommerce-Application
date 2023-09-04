import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InputValidationProfile from '../InputValidationProfile/InputValidationProfile';
import ProfileSelectTag from '../ProfileSelectedTag/ProfileSelectedTag';
import EditMode from '../../shared/components/EditMode/EditMode';
import getCookie from '../../shared/cookie/getCookie';
import {
  Address,
  getProfile,
} from '../../shared/components/StudentsProfileForm/usage/ProfileFormAPI';
import {
  changeProfileAddressCheckboxData,
  setAddressInputValue,
  setProfileSelectValue,
} from '../../app/store/actions/profileAddressesAction/profileAddressesSlice';
import { AppDispatch } from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import Button from '../../shared/components/Button/Button';
import InputCheckbox from '../../shared/components/InputCheckbox/InputCheckbox';
import { store } from '../../app/store/store';
import { setVersion } from '../../app/store/actions/profileVersion/profileVersion';

import { changeAddresses } from './usage/addressesAPI';

interface UserAddressSectionProps {
  title: string;
  inputName: string;
  selectArray: { value: string; data: string; id: number }[];
  addressArray: {
    type: string;
    placeholder: string;
    id: number;
    name: string;
  }[];
  addressId: string;
  isEditMode: boolean;
  defaultAddress: boolean;
  cancelAddNewAddress?: () => void;
  removeAddressProps?: (addressId: string) => void;
  isNewAddressBeingAdded?: boolean;
}

type RootState = ReturnType<typeof store.getState>;

const UserAddressSection: FC<UserAddressSectionProps> = ({
  title,
  inputName,
  selectArray,
  addressArray,
  addressId,
  isEditMode,
  cancelAddNewAddress,
  removeAddressProps,
  isNewAddressBeingAdded,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [editMode, setEditMode] = useState(false);
  const [readonlyMode, setReadonlyMode] = useState(true);

  const addressesType = useSelector(
    (state: RootState) =>
      state.profileAddresses[addressId].withoutValidation.type,
  );

  const checkboxState = useSelector(
    (state: RootState) =>
      state.profileAddresses[addressId].withoutValidation.defaultAddress,
  );

  const checkboxOnChange = (addressId: string) => {
    const checkboxValue = !checkboxState;
    dispatch(changeProfileAddressCheckboxData({ addressId, checkboxValue }));
  };

  const saveAddress = () => {
    const fetchData = async () => {
      try {
        const token: string = getCookie('authToken') as string;
        const profile = await getProfile(token);
        const version = profile.version;
        dispatch(setVersion({ version }));

        await changeAddresses(token, 'change', addressId);

        if (isNewAddressBeingAdded) {
          const profile = await getProfile(token);
          const version = profile.version;
          dispatch(setVersion({ version }));

          if (addressesType === 'billing') {
            await changeAddresses(token, 'addBilling', addressId);
          } else {
            await changeAddresses(token, 'addShipping', addressId);
          }
        }

        setEditMode(false);
        setReadonlyMode(true);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  };

  const onEditMode = () => {
    setEditMode(true);
    setReadonlyMode(false);
  };

  useEffect(() => {
    if (isEditMode) {
      onEditMode();
    }
  }, []);

  const offEditMode = () => {
    setEditMode(false);
    setReadonlyMode(true);
    if (cancelAddNewAddress) {
      cancelAddNewAddress();
    }

    const fetchData = async () => {
      try {
        const token: string = getCookie('authToken') as string;
        const profile = await getProfile(token);

        const oldAddresses =
          profile.addresses[
            (inputName + 'Address') as keyof typeof profile.addresses
          ];

        oldAddresses.forEach((address: Address) => {
          const validArr = ['street', 'city', 'code'];
          const notValid = ['country', 'defaultAddress'];
          validArr.forEach((inputName) => {
            const addressId = address.id as string;
            const inputValue = address[inputName] as string;
            dispatch(
              setAddressInputValue({ addressId, inputName, inputValue }),
            );
          });

          notValid.forEach((inputName) => {
            const addressId = address.id as string;
            const newValue = address[inputName] as string;

            dispatch(setProfileSelectValue({ addressId, inputName, newValue }));
          });
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  };

  const deleteAddress = () => {
    const fetchData = async () => {
      try {
        const token: string = getCookie('authToken') as string;
        const profile = await getProfile(token);
        const version = profile.version;
        await dispatch(setVersion({ version }));

        await changeAddresses(token, 'remove', addressId);

        if (removeAddressProps) {
          await removeAddressProps(addressId);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  };

  return (
    <div className={'profile-form__billing'}>
      <div className={'personal-information-edit_container'}>
        <h5 className={'profile-form__title__adress'}>{title}</h5>
        <EditMode
          editMode={editMode}
          onEditMode={onEditMode}
          offEditMode={offEditMode}
          sendRequest={saveAddress}
          className={'addresses'}
          message={''}
          colorMessage={''}
        />
      </div>
      <div className={'profile-input__billing'}>
        <ProfileSelectTag
          selectArray={selectArray}
          className={'singUp-select'}
          inputName={inputName}
          addressId={addressId}
          readonly={readonlyMode}
        />
        {addressArray.map(({ type, placeholder, id, name }) => (
          <InputValidationProfile
            key={id}
            type={type}
            placeholder={placeholder}
            inputName={name}
            readonly={readonlyMode}
            addressId={addressId}
          />
        ))}
      </div>
      <div className={'address-del-btn_container'}>
        <InputCheckbox
          id={'default'}
          data={`Default ${inputName} address`}
          className={'default-address'}
          onChange={() => checkboxOnChange(addressId)}
          checked={checkboxState as boolean}
          disabled={readonlyMode}
        />
        <Button className={'delete-btn'} data={''} onClick={deleteAddress} />
      </div>
    </div>
  );
};

export default UserAddressSection;
