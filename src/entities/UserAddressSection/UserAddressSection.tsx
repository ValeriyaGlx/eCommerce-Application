import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
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
  setDefaultAddress,
  setProfileSelectValue,
} from '../../app/store/actions/profileAddressesAction/profileAddressesSlice';
import { AppDispatch } from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import Button from '../../shared/components/Button/Button';
import InputCheckbox from '../../shared/components/InputCheckbox/InputCheckbox';
import { store } from '../../app/store/store';
import { setVersion } from '../../app/store/actions/profileVersion/profileVersion';
import { setAddressInputWithValidation } from '../../app/store/actions/profileAddressesAction/profileAddressesAction';

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
  isFinishedAddress?: Dispatch<SetStateAction<boolean>>;
  setNewAddressBeingAdded?: Dispatch<SetStateAction<boolean>>;
}

type RootState = ReturnType<typeof store.getState>;

const UserAddressSection: FC<UserAddressSectionProps> = ({
  title,
  inputName,
  selectArray,
  addressArray,
  addressId,
  isEditMode,
  removeAddressProps,
  isNewAddressBeingAdded,
  isFinishedAddress,
  setNewAddressBeingAdded,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [editMode, setEditMode] = useState(false);
  const [readonlyMode, setReadonlyMode] = useState(true);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('red');
  const [fieldChanges, setFieldChanges] = useState({});
  const [validErrors, setValidErrors] = useState({});

  const onFieldChange = (fieldName: string, fieldValue: string) => {
    setFieldChanges((prevChanges) => ({
      ...prevChanges,
      [fieldName]: fieldValue,
    }));
    if (fieldName !== 'country') {
      const validationErrors =
        store.getState().profileAddresses[addressId].validation[fieldName]
          .validationError;

      setValidErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: validationErrors,
      }));
    }
  };

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
    if (checkboxValue) {
      const type =
        store.getState().profileAddresses[addressId].withoutValidation.type;
      dispatch(setDefaultAddress({ addressId, type: type as string }));
    }
    setFieldChanges((prevChanges) => ({
      ...prevChanges,
      check: 'change',
    }));
  };

  const saveAddress = () => {
    const hasChanges = Object.keys(fieldChanges).length > 0;
    let hasValidationErrors = false;

    Object.values(validErrors).forEach((error) => {
      if (error) {
        hasValidationErrors = true;
      }
    });

    if (!hasChanges) {
      setMessage('No changes made.');
      setColor('red');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

    if (hasValidationErrors) {
      setMessage('Fix validation errors first.');
      setColor('red');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

    function validateBeforeSubmit() {
      const errs: Array<string | null> = [];
      const address = store.getState().profileAddresses[addressId].validation;
      Object.entries(address).forEach((inputName) => {
        errs.push(inputName[1].validationError);
        dispatch(
          setAddressInputWithValidation(
            addressId,
            inputName[0],
            inputName[1].value,
          ),
        );
      });
      return errs.every((el) => el === null || el === '');
    }

    if (!validateBeforeSubmit()) {
      setMessage('Fix validation errors first.');
      setColor('red');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

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
        const defaultAddress =
          store.getState().profileAddresses[addressId].withoutValidation
            .defaultAddress;
        if (defaultAddress) {
          const profile = await getProfile(token);
          const version = profile.version;
          dispatch(setVersion({ version }));

          if (addressesType === 'billing') {
            await changeAddresses(token, 'defaultBilling', addressId);
          } else {
            await changeAddresses(token, 'defaultShipping', addressId);
          }
        }

        if (isFinishedAddress && setNewAddressBeingAdded) {
          isFinishedAddress(false);
          setNewAddressBeingAdded(false);
        }

        setMessage('Data updated successfully!');
        setTimeout(() => setMessage(''), 1000);

        setColor('green');
        setEditMode(false);
        setReadonlyMode(true);

        setEditMode(false);
        setReadonlyMode(true);
        setFieldChanges({});
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
              setAddressInputWithValidation(addressId, inputName, inputValue),
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

      if (isFinishedAddress && setNewAddressBeingAdded) {
        isFinishedAddress(false);
        setNewAddressBeingAdded(false);
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
          message={message}
          colorMessage={color}
        />
      </div>
      <div className={'profile-input__billing'}>
        <ProfileSelectTag
          selectArray={selectArray}
          className={'singUp-select'}
          inputName={inputName}
          addressId={addressId}
          readonly={readonlyMode}
          onFieldChange={onFieldChange}
        />
        {addressArray.map(({ type, placeholder, id, name }) => (
          <InputValidationProfile
            key={id}
            type={type}
            placeholder={placeholder}
            inputName={name}
            readonly={readonlyMode}
            addressId={addressId}
            onFieldChange={onFieldChange}
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
