import mailLogo from '../../assets/icons/mail-line.png';
import passwordLogo from '../../assets/icons/password.png';
import userLogo from '../../assets/icons/user.png';
import dateLogo from '../../assets/icons/date.png';

export const INPUTS_SIGNUP_DATA: {
  id: number;
  type: string;
  placeholder: string;
  name: string;
  logo: typeof mailLogo;
}[] = [
  {
    id: Math.random(),
    type: 'text',
    placeholder: 'Email',
    name: 'email',
    logo: mailLogo,
  },
  {
    id: Math.random(),
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    logo: passwordLogo,
  },
  {
    id: Math.random(),
    type: 'text',
    placeholder: 'Name',
    name: 'name',
    logo: userLogo,
  },
  {
    id: Math.random(),
    type: 'text',
    placeholder: 'Surname',
    name: 'surname',
    logo: userLogo,
  },
  {
    id: Math.random(),
    type: 'date',
    placeholder: 'Birth date',
    name: 'date',
    logo: dateLogo,
  },
];

export const INPUTS_SIGNUP_ADDRESS = [
  {
    type: 'text',
    placeholder: 'City',
    id: Math.random(),
    name: 'city',
  },
  {
    type: 'text',
    placeholder: 'Street',
    id: Math.random(),
    name: 'street',
  },
  {
    type: 'text',
    placeholder: 'Postal Code',
    id: Math.random(),
    name: 'code',
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
