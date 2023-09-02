import React, { FC, useState } from 'react';
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
import EditMode from '../../shared/components/EditMode/EditMode';

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

  const onEditMode = () => {
    setEditMode(true);
    setReadonlyMode(false);
  };

  const offEditMode = () => {
    setEditMode(false);
    setReadonlyMode(true);
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
      <Slider {...sliderSettings}>
        {arr.map(({ id, defaultAddress }, index) => (
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
        onClick={() => {}}
      />
    </div>
  );
};

export default AddressesSectionMap;
