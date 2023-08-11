import * as yup from 'yup';

export const emailValidationSchema: yup.StringSchema = yup
  .string()
  .required('Email is required')
  .matches(/^\S*$/, 'This field must not contain spaces')
  .email('Invalid email format');

export const passwordValidationSchema: yup.StringSchema = yup
  .string()
  .required('Password is required')
  .matches(/^\S*$/, 'This field must not contain spaces')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number');

export const emptyFieldValidationSchema: yup.StringSchema = yup
  .string()
  .required('This field is required')
  .matches(/^[a-zA-Z]*$/, 'This field can only contain letters');

const ageLimit = 13;

export const dateValidationSchema = yup
  .date()
  .transform((value, originalValue) => {
    if (originalValue === '') {
      return undefined; // Treat empty input as undefined
    }
    const parsedDate = new Date(originalValue);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  })
  .max(new Date(), 'Birthdate must be in the past')
  .required('Birthdate is required')
  .test('is-old-enough', 'You must be at least 13 years old', (value) => {
    if (!(value instanceof Date)) {
      return false; // Invalid Date object
    }

    const currentDate = new Date();
    const birthDate = value;
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      age === ageLimit &&
      (birthDate.getMonth() > currentDate.getMonth() ||
        (birthDate.getMonth() === currentDate.getMonth() && birthDate.getDate() > currentDate.getDate()))
    ) {
      return false;
    }

    return age >= ageLimit;
  });
