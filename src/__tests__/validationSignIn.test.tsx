import {
  validateEmail,
  validatePassword,
} from '../entities/InputValidationSignIn/usage/utils/validationSignIn';

describe('validateEmail', () => {
  it('should return "Email is required" if inputEmail is empty', () => {
    const valueEmail = '';
    const result = validateEmail(valueEmail);
    expect(result).toBe('Email is required');
  });

  it('should return "Email must be valid (example@mail.com)" if inputEmail is not a valid email', () => {
    const valueEmail = 'mail';
    const result = validateEmail(valueEmail);
    expect(result).toBe('Email must be valid (example@mail.com)');
  });

  it('should return an empty string if inputEmail is a valid email', () => {
    const valueEmail = 'instance@gmail.com';
    const result = validateEmail(valueEmail);
    expect(result).toBe('');
  });
});

describe('validatePassword', () => {
  it('should return "This field must not contain spaces" if password contains spaces', () => {
    const password = ' spaces ';
    const result = validatePassword(password);
    expect(result).toBe('This field must not contain spaces');
  });

  it('should return "Password must be at least 8 characters" if password is too short', () => {
    const password = 'little';
    const result = validatePassword(password);
    expect(result).toBe('Password must be at least 8 characters');
  });

  it('should return "Password must contain at least one uppercase letter" if password lacks uppercase letters', () => {
    const password = 'qwertyui';
    const result = validatePassword(password);
    expect(result).toBe('Password must contain at least one uppercase letter');
  });

  it('should return "Password must contain at least one lowercase letter" if password lacks lowercase letters', () => {
    const password = 'QWERTYUI';
    const result = validatePassword(password);
    expect(result).toBe('Password must contain at least one lowercase letter');
  });

  it('should return "Password must contain at least one number" if password lacks numbers', () => {
    const password = 'Qwertyui';
    const result = validatePassword(password);
    expect(result).toBe('Password must contain at least one number');
  });

  it('should return "Password must contain at least one special character"', () => {
    const password = '1Qwertyu';
    const result = validatePassword(password);
    expect(result).toBe('Password must contain at least one special character');
  });

  it('should return an empty string if the password is valid', () => {
    const password = '~1Qwerty!';
    const result = validatePassword(password);
    expect(result).toBe('');
  });
});
