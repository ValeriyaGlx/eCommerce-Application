import React from 'react';

import InputValidation from '../../entities/InputValidation/InputValidation';
import {
  INPUTS_SIGNUP_DATA as signUpArray,
  INPUTS_SIGNUP_ADDRESS as addressArray,
  SELECT_SIGNUP_DATA as selectArray,
} from '../../constants/signupConstants/signupConstants';
import SelectTag from '../../entities/SelectTag/SelectTag';
import InputSubmit from '../../entities/InputSubmit/InputSubmit';
import InputCheckbox from '../../entities/InputCheckbox/InputCheckbox';
import Logo from '../../shared/Logo/Logo';
import { openDropdown } from '../../features/formCommon/openDropdown';
import { showPassword } from '../../features/formCommon/showPassword';
import { addDefaulAdress } from '../../features/formCommon/addDefaulAdress';

const SignUpSection = () => {
  return (
    <section className={'section-signUp'}>
      <div className={'container-logo'}>
        <Logo className={'logo-title-black'} />
      </div>
      <h2 className={'section-signUp_inner'}>Create Account</h2>
      <div>
        {signUpArray.map(({ id, type, placeholder, logo, name }) => (
          <InputValidation
            key={id}
            type={type}
            placeholder={placeholder}
            logo={logo}
            showPassword={showPassword}
            inputName={name}
          />
        ))}
      </div>
      <h4>Address Information</h4>
      <div>
        <h5 className={'address-inner'}>Shipping Address</h5>
        <SelectTag
          selectArray={selectArray}
          defaultData={'Choose a country'}
          className={'singUp-select'}
          openDropDown={openDropdown}
        />
        {addressArray.map(({ type, placeholder, id, name }) => (
          <InputValidation
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
          onChange={addDefaulAdress}
        />
      </div>
      <div className={'billing-address_section'}>
        <h5 className={'address-inner'}>Billing Address</h5>
        <SelectTag
          selectArray={selectArray}
          defaultData={'Choose a country'}
          className={'singUp-select'}
          openDropDown={openDropdown}
        />
        {addressArray.map(({ type, placeholder, id, name }) => (
          <InputValidation
            key={id}
            type={type}
            placeholder={placeholder}
            inputName={'billing_' + name}
          />
        ))}
      </div>
      <InputSubmit
        className={'button-signUp signup_submit-button'}
        value={'SIGN UP'}
      />
    </section>
  );
};

export default SignUpSection;
