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
import { Address } from '../../shared/components/StudentsProfileForm/usage/ProfileFormAPI';
import Button from '../../shared/components/Button/Button';
import { AppDispatch } from '../../shared/components/StudentsProfileForm/StudentsProfileForm';
import { createNewAddress } from '../../app/store/actions/profileAddressesAction/profileAddressesSlice';

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
  const [editMode, setEditMode] = useState(false);
  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setAddresses(arr);
  }, [arr]);

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
    setEditMode(true);
  };

  return (
    <div className={'addresses-container'}>
      <h4 className={'profile-form__headline'}>{title}</h4>
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
            addressId={id}
            defaultAddress={defaultAddress}
            isEditMode={editMode}
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
