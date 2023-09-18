import mailLogo from '../../assets/icons/mail-line.png';
import userLogo from '../../assets/icons/user.png';
import dateLogo from '../../assets/icons/date.png';

export const INPUTS_PROFILE_DATA: {
  id: number;
  type: string;
  placeholder: string;
  name: string;
  logo: typeof mailLogo;
  min?: string;
  style?: string;
}[] = [
  {
    id: Math.random(),
    type: 'text',
    placeholder: 'Name',
    name: 'name',
    logo: userLogo,
    style: 'input-profile',
  },
  {
    id: Math.random(),
    type: 'text',
    placeholder: 'Surname',
    name: 'surname',
    logo: userLogo,
    style: 'input-profile',
  },
  {
    id: Math.random(),
    type: 'text',
    placeholder: 'Email',
    name: 'email',
    logo: mailLogo,
    style: 'input-profile',
  },
  {
    id: Math.random(),
    type: 'date',
    placeholder: 'Birth date',
    name: 'date',
    logo: dateLogo,
    min: '1900-01-02',
    style: 'input-profile',
  },
];

export const INPUTS_PROFILE_ADDRESS = [
  {
    type: 'text',
    placeholder: 'Postal Code',
    id: Math.random(),
    name: 'postalCode',
  },
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
    name: 'streetName',
  },
];
