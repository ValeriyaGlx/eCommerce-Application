export const validateEmail = (inputEmail: string) => {
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!inputEmail) {
    return 'Email address must not be empty';
  }

  if (inputEmail !== inputEmail.trim()) {
    return 'Email address must not contain leading or trailing whitespace';
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
  const specialSymbolPassword: boolean = /[!@#$%^&*]/.test(password);
  const noWhitespacePassword: boolean =
    !password.startsWith(' ') && !password.endsWith(' ');

  switch (true) {
    case !noWhitespacePassword:
      return 'Password must not have leading or trailing whitespace';
    case !uppercasePassword:
      return 'Password must contain at least one uppercase letter';
    case !lowercasePassword:
      return 'Password must contain at least one lowercase letter';
    case !digitPassword:
      return 'Password must contain at least one digit';
    case !specialSymbolPassword:
      return 'Password does not contain a special character (@#$%^&*)';
    case !lengthPassword:
      return 'Password must be at least 8 characters long';
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
