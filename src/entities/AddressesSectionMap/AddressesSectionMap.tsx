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
import {
  createNewAddress,
  removeAddress,
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
  const [editMode, setEditMode] = useState(false);
  const [isNewAddressBeingAdded, setIsNewAddressBeingAdded] = useState(false);
  const sliderRef = useRef<Slider | null>(null);
  const [isUnfinishedAddress, setIsUnfinishedAddress] = useState('');

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

  const removeAddressProps = (addressIdToRemove: string) => {
    // Filter out the address to remove from the state.
    const updatedAddresses = addresses.filter(
      (address) => address.id !== addressIdToRemove,
    );

    // Update the state with the new addresses.
    setAddresses(updatedAddresses);

    // Find the index of the removed address.
    const removedIndex = addresses.findIndex(
      (address) => address.id === addressIdToRemove,
    );

    // Update the current index to show the previous address.
    const newIndex = removedIndex > 0 ? removedIndex - 1 : 0;
    setCurrentIndex(newIndex);
  };

  const addNewAddress = () => {
    if (!isNewAddressBeingAdded) {
      const newAddress: Address = {
        id: String(Math.random()),
        country: 'Choose a country',
        defaultAddress: false,
      };

      const newAddressId = newAddress.id;
      dispatch(createNewAddress({ newAddressId, inputName }));
      setAddresses([...addresses, newAddress]);
      setCurrentIndex(addresses.length);

      if (sliderRef.current) {
        sliderRef.current.slickGoTo(addresses.length);
      }
      setEditMode(true);
      setIsNewAddressBeingAdded(true);
    }
    if (isNewAddressBeingAdded) {
      setIsUnfinishedAddress(
        'Please finish with the first address before adding a new one.',
      );
      setTimeout(() => {
        setIsUnfinishedAddress('');
      }, 1000);
    }
  };

  const cancelAddNewAddress = () => {
    if (isNewAddressBeingAdded) {
      const removedAddress = addresses[addresses.length - 1].id;
      setAddresses(addresses.slice(0, addresses.length - 1));
      setIsNewAddressBeingAdded(false);
      dispatch(removeAddress(removedAddress));
    }
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
            key={addresses.length}
            inputName={inputName}
            title={`Address #${addresses.length}`}
            selectArray={selectArray}
            addressArray={addressArray}
            addressId={id}
            isEditMode={editMode}
            defaultAddress={defaultAddress}
            cancelAddNewAddress={cancelAddNewAddress}
            removeAddressProps={removeAddressProps}
          />
        ))}
      </Slider>
      <div className={'finish-new-address-msg'}>{isUnfinishedAddress}</div>

      <Button
        className={'profile-add-address'}
        data={`Add New ${title}`}
        onClick={addNewAddress}
      />
    </div>
  );
};

export default AddressesSectionMap;
