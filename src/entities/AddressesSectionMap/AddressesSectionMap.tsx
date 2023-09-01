import React, { FC } from 'react';
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

interface AddressesSectionMapProps {
  arr: Address[];
  inputName: string;
  title: string;
  selectArray: typeof SELECT_SIGNUP_DATA;
  addressArray: typeof INPUTS_SIGNUP_ADDRESS;
  readonly: boolean;
}

const AddressesSectionMap: FC<AddressesSectionMapProps> = ({
  arr,
  inputName,
  title,
  addressArray,
  selectArray,
  readonly,
}) => {
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={'addresses-container'}>
      <Slider {...sliderSettings}>
        {arr.map(({ id }, index) => (
          <UserAddressSection
            key={id}
            inputName={inputName}
            title={`${title} ${index + 1}`}
            selectArray={selectArray}
            addressArray={addressArray}
            readonly={readonly}
            addressId={id}
          />
        ))}
        <div>Add new</div>
      </Slider>
    </div>
  );
};

export default AddressesSectionMap;
