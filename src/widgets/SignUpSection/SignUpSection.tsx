import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import './_SignUpAnimation.scss';

import {
  INPUTS_SIGNUP_DATA as signUpArray,
  INPUTS_SIGNUP_ADDRESS as addressArray,
  SELECT_SIGNUP_DATA as selectArray,
} from '../../constants/signupConstants/signupConstants';
import InputSubmit from '../../shared/components/InputSubmit/InputSubmit';
import InputCheckbox from '../../shared/components/InputCheckbox/InputCheckbox';
import Logo from '../../shared/Logo/Logo';
import { showPassword } from '../../features/formCommon/showPassword';
import SignUpSelectTag from '../../entities/SignUpSelectTag/SignUpSelectTag';
import { setInputValueWithValidation } from '../../app/store/validationActions/signupActions';
import { store } from '../../app/store/store';
import InputValidationSignUp from '../../entities/InputValidationSignUp/view/InputValidationSignUp';

type RootState = ReturnType<typeof store.getState>;

const SignUpSection = () => {
  const [checkbox, setCheckbox] = useState(false);

  const checkboxOnChange = () => {
    setCheckbox(!checkbox);
  };

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const inputsState = useSelector((state: RootState) => state.inputs.signup);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Object.entries(inputsState).forEach((inputName) => {
      dispatch(setInputValueWithValidation(inputName[0], inputName[1].value));
    });
  };

  return (
    <section className={'section-signUp'}>
      <div className={'container-logo'}>
        <Logo className={'logo-title-black'} />
      </div>
      <h2 className={'section-signUp_inner'}>Create Account</h2>
      <div className={'container-input'}>
        <form onSubmit={handleSubmit}>
          <div>
            {signUpArray.map(({ id, type, placeholder, logo, name, min }) => (
              <InputValidationSignUp
                key={id}
                type={type}
                placeholder={placeholder}
                logo={logo}
                showPassword={showPassword}
                inputName={name}
                min={min}
              />
            ))}
          </div>
          <h4>Address Information</h4>
          <div>
            <h5 className={'address-inner'}>Shipping Address</h5>
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
            <InputCheckbox
              id={'default-address'}
              data={'Make this address default'}
              className={'default-address'}
              onChange={checkboxOnChange}
            />
          </div>

          <CSSTransition
            in={!checkbox}
            classNames='component-above'
            timeout={300}
            unmountOnExit
          >
            <div>
              <h5 className={'address-inner'}>Billing Address</h5>
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
          </CSSTransition>
          <InputSubmit
            className={`button-signUp signup_submit-button button-move-up ${
              !checkbox ? 'moved' : ''
            }`}
            value={'SIGN UP'}
          />
        </form>
      </div>
    </section>
  );
};

export default SignUpSection;
