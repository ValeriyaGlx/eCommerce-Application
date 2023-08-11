import * as yup from 'yup';
import { Action, ThunkAction } from '@reduxjs/toolkit';

import {
  dateValidationSchema,
  emailValidationSchema,
  emptyFieldValidationSchema,
  passwordValidationSchema,
} from '../../../features/utils/validation/validationSignUp';

import { clearInputValidationError, setInputValidationError, setInputValue } from './sugnupSlice';
import { store } from '../store';

type RootState = ReturnType<typeof store.getState>;

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const setInputValueWithValidation =
  (inputName: string, inputValue: string): AppThunk =>
  (dispatch) => {
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
