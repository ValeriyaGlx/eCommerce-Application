import mailLogo from '../../assets/icons/mail-line.png';
import passwordLogo from '../../assets/icons/password.png';
import userLogo from '../../assets/icons/user.png';
import dateLogo from '../../assets/icons/date.png';

export const INPUTS_SIGNUP_DATA: { type: string; placeholder: string; id: number; logo: typeof mailLogo }[] = [
  {
    type: 'text',
    placeholder: 'Email',
    id: Math.random(),
    logo: mailLogo,
  },
  {
    type: 'password',
    placeholder: 'Password',
    id: Math.random(),
    logo: passwordLogo,
  },
  {
    type: 'text',
    placeholder: 'Name',
    id: Math.random(),
    logo: userLogo,
  },
  {
    type: 'text',
    placeholder: 'Surname',
    id: Math.random(),
    logo: userLogo,
  },
  {
    type: 'date',
    placeholder: 'Birth date',
    id: Math.random(),
    logo: dateLogo,
  },
];

export const INPUTS_SIGNUP_ADDRESS = [
  {
    type: 'text',
    placeholder: 'City',
    id: Math.random(),
  },
  {
    type: 'text',
    placeholder: 'Street',
    id: Math.random(),
  },
  {
    type: 'text',
    placeholder: 'Postal Code',
    id: Math.random(),
  },
];

export const SELECT_SIGNUP_DATA = [
  {
    value: 'us',
    data: 'United States',
    id: Math.random(),
  },
  {
    value: 'ru',
    data: 'Russia',
    id: Math.random(),
  },
  {
    value: 'by',
    data: 'Belarus',
    id: Math.random(),
  },
  {
    value: 'ge',
    data: 'Georgia',
    id: Math.random(),
  },
];
