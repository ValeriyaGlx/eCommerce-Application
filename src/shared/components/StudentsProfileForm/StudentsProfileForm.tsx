import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import './_StudentsProfileForm.scss';
import { INPUTS_PROFILE_DATA as profLinks } from '../../../constants/studentsProfileFormInput/studentsProfileFormInput';
import InputValidationSignUp from '../../../entities/InputValidationSignUp/view/InputValidationSignUp';
import daw from '../../../assets/icons/daw.svg';
import cross from '../../../assets/icons/cross.svg';
import pencil from '../../../assets/img/pencil.png';
import {
  INPUTS_SIGNUP_ADDRESS as addressArray,
  SELECT_SIGNUP_DATA as selectArray,
} from '../../../constants/signupConstants/signupConstants';
import getCookie from '../../cookie/getCookie';
import { setInputValueWithValidation } from '../../../app/store/actions/signupActions/signupActions';
import UserAddressSection from '../../../entities/UserAddressSection/UserAddressSection';

import { getProfile } from './usage/ProfileFormAPI';

export const StudentProfileForm = () => {
  const dispatch = useDispatch();
  const isActive = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token: string = getCookie('authToken') as string;
        const profile = await getProfile(token);
        const profileFields = Object.entries(profile);

        profileFields.forEach((el) => {
          const inputName = el[0];
          const newValue = el[1];
          dispatch(setInputValueWithValidation(inputName, newValue));
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    const active = isActive.current;
    if (active) {
      active.classList.toggle('active');
    }
  };

  return (
    <div className={'profile-form'}>
      <div className={'profile-form__head'}>
        <div className={'profile-form__title'}>Student's Profile</div>
        <div className={'profile-form__icon'} ref={isActive}>
          <div className={'profile-form__button'}>
            <button type='button' onClick={handleClick}>
              <img src={daw} alt='' />{' '}
            </button>
            <button type='button' onClick={handleClick}>
              <img src={cross} alt='' />{' '}
            </button>
          </div>
          <button
            type='button'
            className={'profile-form__button--icon'}
            onClick={handleClick}
          >
            <img src={pencil} alt='img' />
          </button>
        </div>
      </div>
      <div className={'profile-form__input'}>
        {profLinks.map(({ id, type, placeholder, name, logo, min, style }) => (
          <InputValidationSignUp
            key={id}
            type={type}
            placeholder={placeholder}
            inputName={name}
            logo={logo}
            min={min}
            styles={style}
            readonly={true}
          />
        ))}
      </div>
      <h4 className={'profile-form__headline'}>Adress information</h4>
      <UserAddressSection
        title={'Shipping Address'}
        selectArray={selectArray}
        addressArray={addressArray}
        readonly={true}
      />
      <UserAddressSection
        title={'Billing address'}
        selectArray={selectArray}
        addressArray={addressArray}
        readonly={true}
      />
    </div>
  );
};

export default StudentProfileForm;
