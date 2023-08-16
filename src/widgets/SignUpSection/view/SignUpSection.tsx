import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import './_SignUpAnimation.scss';
import './_SignUpSection.scss';

import {
  INPUTS_SIGNUP_DATA as signUpArray,
  INPUTS_SIGNUP_ADDRESS as addressArray,
  SELECT_SIGNUP_DATA as selectArray,
} from '../../../constants/signupConstants/signupConstants';
import InputSubmit from '../../../shared/components/InputSubmit/InputSubmit';
import InputCheckbox from '../../../shared/components/InputCheckbox/InputCheckbox';
import Logo from '../../../shared/Logo/Logo';
import { showPassword } from '../../../features/formCommon/showPassword';
import SignUpSelectTag from '../../../entities/SignUpSelectTag/SignUpSelectTag';
import { setInputValueWithValidation } from '../../../app/store/signupActions/signupActions';
import { store } from '../../../app/store/store';
import InputValidationSignUp from '../../../entities/InputValidationSignUp/view/InputValidationSignUp';
import {
  changeAddressCheckboxData,
  CheckboxesState,
} from '../../../app/store/signupActions/sugnupSlice';
import { setRegistrationValue } from '../../../app/store/authorizationAction/authorizationSlice';

type RootState = ReturnType<typeof store.getState>;

const SignUpSection = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [checkInput, setCheckInput] = useState(true);

  const checkboxState = useSelector(
    (state: RootState) => state.signup.checkboxes,
  );

  const checkboxOnChange = (checkbox: keyof CheckboxesState) => {
    const checkboxValue = !checkboxState[checkbox];
    dispatch(changeAddressCheckboxData({ checkbox, checkboxValue }));
  };

  const inputsState = useSelector((state: RootState) => state.signup.signup);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(inputsState).forEach((inputName) => {
      dispatch(setInputValueWithValidation(inputName[0], inputName[1].value));
    });
    setCheckInput(!checkInput);
  };

  useEffect(() => {
    const values = Object.values(inputsState);
    const singleAddress = checkboxState.isSameAddress;
    if (singleAddress) {
      values.length = 7;
    }
    const isSubmit = values.every((el) => el.validationError === null);
    dispatch(setRegistrationValue({ isSubmit }));
  }, [checkInput]);

  return (
    <section className={'section-signUp'}>
      <div className={'container-logo'}>
        <Logo className={'logo-title-black'} />
      </div>
      <h2 className={'section-signUp_inner'}>Create Account</h2>
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
          <h5 className={'address-inner'}>
            {checkboxState.isSameAddress
              ? 'Billing and Shipping Address'
              : 'Shipping Address'}
          </h5>
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
          {checkboxState.isSameAddress && (
            <InputCheckbox
              id={'default-address'}
              data={'Make default for billing and shipping'}
              className={'default-address'}
              onChange={() => {
                checkboxOnChange('isDefaultBothAddresses');
              }}
              checked={checkboxState.isDefaultBothAddresses}
            />
          )}
          {!checkboxState.isSameAddress && (
            <InputCheckbox
              id={'shipping-address'}
              data={'Make default for shipping '}
              className={'default-address'}
              onChange={() => checkboxOnChange('isShippingDefault')}
              checked={checkboxState.isShippingDefault}
            />
          )}
        </div>

        <CSSTransition
          in={!checkboxState.isSameAddress}
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
            <InputCheckbox
              id={'billing-address'}
              data={'Make default for billing'}
              className={'default-address'}
              onChange={() => checkboxOnChange('isBillingDefault')}
              checked={checkboxState.isBillingDefault}
            />
          </div>
        </CSSTransition>
        <InputCheckbox
          id={'same-addresses'}
          data={'Set the same billing and shipping address'}
          className={`default-address  ${
            !checkboxState.isSameAddress ? 'moved' : ''
          }`}
          onChange={() => checkboxOnChange(`isSameAddress`)}
          checked={checkboxState.isSameAddress}
        />
        <InputSubmit
          className={`button-signUp signup_submit-button button-move-up ${
            !checkboxState.isSameAddress ? 'moved' : ''
          }`}
          value={'SIGN UP'}
        />
      </form>
    </section>
  );
};

export default SignUpSection;
