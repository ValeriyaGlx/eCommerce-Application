import * as yup from 'yup';
import { Action, ThunkAction } from '@reduxjs/toolkit';

import {
  dateValidationSchema,
  emailValidationSchema,
  emptyFieldValidationSchema,
  getPostalCodeValidationSchema,
  passwordValidationSchema,
} from '../../../features/utils/validation/validationSignUp';
import { store } from '../store';

import { clearInputValidationError, setInputValidationError, setInputValue } from './sugnupSlice';

type RootState = ReturnType<typeof store.getState>;

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const setInputValueWithValidation = (inputName: string, inputValue: string): AppThunk => {
  return (dispatch) => {
    dispatch(setInputValue({ inputName, inputValue }));

    let validationSchema: yup.StringSchema | yup.DateSchema;

    switch (inputName) {
      case 'email':
        validationSchema = emailValidationSchema;
        break;
      case 'password':
        validationSchema = passwordValidationSchema;
        break;
      case 'date':
        validationSchema = dateValidationSchema;
        break;
      case 'shipping_code':
        const countryShip = store.getState().inputs.countries.shipping.toLowerCase();
        validationSchema = getPostalCodeValidationSchema(countryShip);
        break;
      case 'billing_code':
        const countryBill = store.getState().inputs.countries.billing.toLowerCase();
        validationSchema = getPostalCodeValidationSchema(countryBill);
        break;
      default:
        validationSchema = emptyFieldValidationSchema;
    }

    try {
      validationSchema.validateSync(inputValue);
      dispatch(clearInputValidationError({ inputName }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        dispatch(setInputValidationError({ inputName, validationError: error.message }));
      }
    }
  };
};
