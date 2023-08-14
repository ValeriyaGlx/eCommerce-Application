export const validateEmail = (inputEmail: string) => {
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!inputEmail) {
    return 'Email is required';
  }

  if (!emailRegex.test(inputEmail)) {
    return 'Email address must be properly formatted';
  }

  return '';
};

export const validatePassword = (password: string) => {
  const lengthPassword: boolean = password.length >= 8;
  const uppercasePassword: boolean = /[A-Z]/.test(password);
  const lowercasePassword: boolean = /[a-z]/.test(password);
  const digitPassword: boolean = /\d/.test(password);
  const specialSymbolPassword: boolean = /[^A-Za-z0-9]/.test(password);
  const noWhitespacePassword: boolean = !password.endsWith(' ');

  switch (true) {
    case !noWhitespacePassword:
      return 'This field must not contain spaces';
    case !lengthPassword:
      return 'Password must be at least 8 characters';
    case !uppercasePassword:
      return 'Password must contain at least one uppercase letter';
    case !lowercasePassword:
      return 'Password must contain at least one lowercase letter';
    case !digitPassword:
      return 'Password must contain at least one number';
    case !specialSymbolPassword:
      return 'Password must contain at least one special character';

    default:
      return '';
  }
};

export const validateSubmit = (email: string, password: string) => {
  const messageEmail = validateEmail(email);
  const messagePassword = validatePassword(password);
  if (messageEmail.length !== 0 && messagePassword.length !== 0) {
    return 'Incorrect password and Email';
  } else if (messagePassword.length !== 0) {
    return 'Incorrect password';
  } else if (messageEmail.length !== 0) {
    return 'Incorrect Email';
  } else {
    return '';
  }
};
