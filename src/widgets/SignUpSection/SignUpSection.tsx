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
import blueLogo from '../../assets/icons/logo-blue.svg';

const SignUpSection = () => {
  return (
    <section className={'section-signUp'}>
      <Logo logo={blueLogo} />
      <h2 className={'section-signUp_inner'}>Create Account</h2>
      <div>
        {signUpArray.map(({ type, placeholder, logo }) => (
          <InputValidation type={type} placeholder={placeholder} logo={logo} />
        ))}
      </div>
      <h4>Address Information</h4>
      <div>
        <h5>Shipping Address</h5>
        <SelectTag
          selectArray={selectArray}
          defaultData={'-- Choose a country --'}
        />
        {addressArray.map(({ type, placeholder }) => (
          <InputValidation type={type} placeholder={placeholder} />
        ))}
        <InputCheckbox
          id={'default-address'}
          isChecked={true}
          data={'Make default'}
        />
      </div>

      <h5>Billing Address</h5>
      <SelectTag
        selectArray={selectArray}
        defaultData={'-- Choose a country --'}
      />
      {addressArray.map(({ type, placeholder }) => (
        <InputValidation type={type} placeholder={placeholder} />
      ))}
      <InputSubmit className={'signup_submit-button'} value={'SIGN UP'} />
    </section>
  );
};

export default SignUpSection;
