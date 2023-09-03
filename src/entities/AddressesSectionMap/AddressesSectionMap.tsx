import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';

import UserAddressSection from '../UserAddressSection/UserAddressSection';
import {
  INPUTS_SIGNUP_ADDRESS,
  SELECT_SIGNUP_DATA,
} from '../../constants/signupConstants/signupConstants';
import './_AddressesSectionMap.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Address,
  getProfile,
} from '../../shared/components/StudentsProfileForm/usage/ProfileFormAPI';
import Button from '../../shared/components/Button/Button';
import EditMode from '../../shared/components/EditMode/EditMode';
import { AppDispatch } from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import getCookie from '../../shared/cookie/getCookie';
import {
  createNewAddress,
  setAddressInputValue,
  setProfileSelectValue,
} from '../../app/store/actions/profileAddressesAction/profileAddressesSlice';

interface AddressesSectionMapProps {
  arr: Address[];
  inputName: string;
  title: string;
  selectArray: typeof SELECT_SIGNUP_DATA;
  addressArray: typeof INPUTS_SIGNUP_ADDRESS;
}

const AddressesSectionMap: FC<AddressesSectionMapProps> = ({
  arr,
  inputName,
  title,
  addressArray,
  selectArray,
}) => {
  const [addresses, setAddresses] = useState<Address[]>(arr);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [editMode, setEditMode] = useState(false);
  const [readonlyMode, setReadonlyMode] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setAddresses(arr);
  }, [arr]);

  const onEditMode = () => {
    setEditMode(true);
    setReadonlyMode(false);
  };

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

  const addNewAddress = () => {
    const newAddress: Address = {
      id: String(Math.random()),
      country: 'Choose a country',
      defaultAddress: false,
    };

    const newAddressId = newAddress.id;
    dispatch(createNewAddress(newAddressId));
    setAddresses([...addresses, newAddress]);
    setCurrentIndex(addresses.length);

    if (sliderRef.current) {
      sliderRef.current.slickGoTo(addresses.length);
    }

    onEditMode();
  };

  return (
    <div className={'addresses-container'}>
      <div className={'personal-information-edit_container'}>
        <h4 className={'profile-form__headline'}>{title}</h4>
        <EditMode
          editMode={editMode}
          onEditMode={onEditMode}
          offEditMode={offEditMode}
        />
      </div>
      <Slider
        {...sliderSettings}
        ref={sliderRef}
        initialSlide={currentIndex}
        afterChange={(index) => setCurrentIndex(index)}
      >
        {addresses.map(({ id, defaultAddress }, index) => (
          <UserAddressSection
            key={id}
            inputName={inputName}
            title={`Address #${index + 1}`}
            selectArray={selectArray}
            addressArray={addressArray}
            readonly={readonlyMode}
            addressId={id}
            defaultAddress={defaultAddress}
          />
        ))}
      </Slider>
      <Button
        className={'profile-add-address'}
        data={`Add New ${title}`}
        onClick={addNewAddress}
      />
    </div>
  );
};

export default AddressesSectionMap;
