import * as yup from 'yup';

export const emailValidationSchema = yup
  .string()
  .trim()
  .required('Email is required')
  .test('email-tld', 'Email must be valid (example@mail.com)', (value) => {
    if (!value) {
      return false;
    }
    const parts = value.split('@');
    if (parts.length !== 2) {
      return false;
    }

    const domain = parts[1].trim();
    const domainParts = domain.split('.');

    return domainParts.length >= 2 && domainParts.every((part) => part.trim() !== '');
  });

export const passwordValidationSchema: yup.StringSchema = yup
  .string()
  .required('Password is required')
  .matches(/^\S*$/, 'This field must not contain spaces')
  .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
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

export function getPostalCodeValidationSchema(country?: string): yup.StringSchema<string> {
  const countryFormats: Record<string, RegExp> = {
    russia: /^\d{6}$/,
    'united states': /^\d{5}(-\d{4})?$/,
    georgia: /^\d{4}$/,
    belarus: /^\d{6}$/,
  };

  if (country) {
    const formatRegex = countryFormats[country.toLowerCase()];
    if (formatRegex) {
      return yup
        .string()
        .required('This field is required')
        .trim()
        .matches(
          formatRegex,
          `Invalid postal code format for ${country[0].toUpperCase() + country.slice(1)}`,
        ) as yup.StringSchema<string>;
    }
  }

  return yup
    .string()
    .required('Please select a country first')
    .trim()
    .test({
      name: 'country-validation',
      message: 'Please select a country first',
      test: (value) => !value || value.trim() === '',
    }) as yup.StringSchema<string>;
}
