import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import logoSuccess from '../../../assets/icons/modal-logo-success.png';
import logoFailed from '../../../assets/icons/modal-logo-failed.png';
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
import { setInputValueWithValidation } from '../../../app/store/actions/signupActions/signupActions';
import { store } from '../../../app/store/store';
import InputValidationSignUp from '../../../entities/InputValidationSignUp/view/InputValidationSignUp';
import {
  changeAddressCheckboxData,
  CheckboxesState,
  resetState,
} from '../../../app/store/actions/signupActions/sugnupSlice';
import {
  loginSuccess,
  setRegistrationValue,
} from '../../../app/store/actions/authorizationAction/authorizationSlice';
import makeSubmitData from '../usage/makeSubmitData';
import logUpRequest, { getAccessToken } from '../usage/ApiRegistration';
import ModalSignPage from '../../../features/ModalFailed/ModalFailed';
import {
  logInRequest,
  tokenRequest,
} from '../../../features/formSubmitSignIn/usage/ApiAuthorization';
import arrow from '../../../assets/icons/arrow-blue.svg';
import setToken from '../../../shared/cookie/setToken';
import setDataLocalStorage from '../../../shared/localStorage/setDataLocalStorage';

type RootState = ReturnType<typeof store.getState>;

const SignUpSection = () => {
  const [isModal, setIsModal] = useState(false);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [checkInput, setCheckInput] = useState(true);
  const [sendRequest, setSendRequest] = useState(false);
  const navigate = useNavigate();

  const [hideAddress, setHideAddress] = useState(true);
  const checkboxState = useSelector(
    (state: RootState) => state.signup.checkboxes,
  );

  const checkboxOnChange = (checkbox: keyof CheckboxesState) => {
    const checkboxValue = !checkboxState[checkbox];
    dispatch(changeAddressCheckboxData({ checkbox, checkboxValue }));
  };

  const inputsState = useSelector((state: RootState) => state.signup.signup);
  const isSignUpSuccessful = store.getState().modal.isSignUpSuccessful;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(inputsState).forEach((inputName) => {
      dispatch(setInputValueWithValidation(inputName[0], inputName[1].value));
    });
    setCheckInput(!checkInput);
    setSendRequest(true);
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

  useEffect(() => {
    const isSubmit = store.getState().authorization.isRegistration;

    if (isSubmit && sendRequest) {
      const data = makeSubmitData();
      const request = async () => {
        const token = await getAccessToken();
        const accessToken = token.access_token;
        await logUpRequest(data, accessToken);
      };
      request().then(() => setIsModal(true));
      dispatch(setRegistrationValue({ isSubmit: false }));
      setSendRequest(false);
    }
  }, [handleSubmit]);

  useEffect(() => {
    async function sendSignUp() {
      const token = await tokenRequest(
        inputsState.email.value,
        inputsState.password.value,
      );
      const accessToken = token.access_token;
      setToken('authToken', accessToken);

      async function signIn() {
        const logindata = await logInRequest(
          inputsState.email.value,
          inputsState.password.value,
          accessToken,
        );
        store.dispatch(loginSuccess());
        setDataLocalStorage('firstName', logindata.customer.firstName);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }

      await signIn();
    }

    if (isSignUpSuccessful && isModal) {
      sendSignUp();
      dispatch(resetState());
    }
  }, [isModal]);

  return (
    <section className={'section-signUp'}>
      <div className={'container-logo'}>
        <Logo className={'logo-title-black'} />
      </div>
      <h2 className={'section-signUp_inner'}>Create Account</h2>
      <form className={'wrapper-form'} onSubmit={handleSubmit}>
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

        <CSSTransition
          in={!hideAddress}
          classNames='component-above'
          timeout={300}
          unmountOnExit
        >
          <>
            <h4 className={'address-title'}>Address Information</h4>
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
              onChange={() => checkboxOnChange('isSameAddress')}
              checked={checkboxState.isSameAddress}
            />
            <InputSubmit
              className={`button-signUp signup_submit-button button-move-up ${
                !checkboxState.isSameAddress ? 'moved' : ''
              }`}
              value={'Sign up'}
            />
          </>
        </CSSTransition>
        {hideAddress && (
          <button
            className={'signup-down'}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setHideAddress(false);
            }}
          >
            <img src={arrow} alt={'down'} />
          </button>
        )}
      </form>
      <ModalSignPage
        logo={isSignUpSuccessful ? logoSuccess : logoFailed}
        h2={isSignUpSuccessful ? 'Great!' : 'Sign Up Failed!'}
        p={
          isSignUpSuccessful
            ? 'Your account has been creative successfully \n You will be redirected to the home page automatically'
            : 'Maybe you’re already registered \n Please, recheck your data and try again'
        }
        isOpen={isModal}
        buttonValue={isSignUpSuccessful ? 'Go to main' : 'Try again'}
        isSignUpSuccessful={isSignUpSuccessful}
        onClick={() => setIsModal(false)}
      />
    </section>
  );
};

export default SignUpSection;
