import mailLogo from '../../assets/icons/mail-line.png';
import passwordLogo from '../../assets/icons/password.png';
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
    placeholder: 'Email',
    name: 'email',
    logo: mailLogo,
    style: 'input-profile',
  },
  {
    id: Math.random(),
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    logo: passwordLogo,
    style: 'input-profile',
  },
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
    type: 'date',
    placeholder: 'Birth date',
    name: 'date',
    logo: dateLogo,
    min: '1900-01-02',
    style: 'input-profile',
  },
];
