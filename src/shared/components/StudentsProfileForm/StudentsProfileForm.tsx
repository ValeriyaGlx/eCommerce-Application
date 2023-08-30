import React, { useRef } from 'react';

import './_StudentsProfileForm.scss';
// eslint-disable-next-line max-len
import { INPUTS_PROFILE_DATA as profileLinks } from '../../../constants/studentsProfileFormInput/studentsProfileFormInput';
import InputValidationSignUp from '../../../entities/InputValidationSignUp/view/InputValidationSignUp';
import submit from '../../../assets/icons/daw.png';
import close from '../../../assets/icons/close.png';
import pencil from '../../../assets/img/pencil.png';
import {
  INPUTS_SIGNUP_ADDRESS as addressArray,
  SELECT_SIGNUP_DATA as selectArray,
} from '../../../constants/signupConstants/signupConstants';
import SignUpSelectTag from '../../../entities/SignUpSelectTag/SignUpSelectTag';

export const StudentProfileForm = () => {
  const isActive = useRef<HTMLDivElement>(null);

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
              <img src={submit} alt='' />{' '}
            </button>
            <button type='button' onClick={handleClick}>
              <img src={close} alt='' />{' '}
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
        {profileLinks.map(
          ({ id, type, placeholder, name, logo, min, style }) => (
            <InputValidationSignUp
              key={id}
              type={type}
              placeholder={placeholder}
              inputName={name}
              logo={logo}
              min={min}
              styles={style}
            />
          ),
        )}
      </div>
      <div className={'profile-form__adress'}>
        <h4 className={'profile-form__headline'}>Adress information</h4>
        <h5 className={'profile-form__title__adress'}>Shipping Adress</h5>
        <div className={'profile-input__shipping'}>
          <SignUpSelectTag
            selectArray={selectArray}
            className={'singUp-select'}
            inputName={'shipping'}
          />
          {addressArray.map(({ type, placeholder, id, name }) => (
            <InputValidationSignUp
              key={id}
              type={type}
              placeholder={placeholder}
              inputName={'shipping_' + name}
            />
          ))}
        </div>
      </div>
      <div className={'profile-form__billing'}>
        <h5 className={'profile-form__title__adress'}>Billing adress</h5>
        <div className={'profile-input__billing'}>
          <SignUpSelectTag
            selectArray={selectArray}
            className={'singUp-select'}
            inputName={'billing'}
          />
          {addressArray.map(({ type, placeholder, id, name }) => (
            <InputValidationSignUp
              key={id}
              type={type}
              placeholder={placeholder}
              inputName={'billing_' + name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileForm;
