import * as yup from 'yup';
import { Action, ThunkAction } from '@reduxjs/toolkit';

import {
  emptyFieldValidationSchema,
  getPostalCodeValidationSchema,
  streetValidationSchema,
} from '../../../../entities/InputValidationSignUp/usage/utils/validationSignUp';
import { store } from '../../store';
import {
  clearAddressInputValidationError,
  setAddressInputValidationError,
  setAddressInputValue,
} from './profileAddressesSlice';

type RootState = ReturnType<typeof store.getState>;

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const setAddressInputValueWithValidation = (
  addressId: string,
  inputName: string,
  inputValue: string,
): AppThunk => {
  return (dispatch) => {
    dispatch(setAddressInputValue({ addressId, inputName, inputValue }));

    let validationSchema: yup.StringSchema | yup.DateSchema;

    switch (inputName) {
      case 'street':
        validationSchema = streetValidationSchema;
        break;
      case 'code':
        const countryShip = store.getState().profileAddresses[addressId].withoutValidation.country;
        validationSchema = getPostalCodeValidationSchema(countryShip);
        break;
      default:
        validationSchema = emptyFieldValidationSchema;
    }

    try {
      validationSchema.validateSync(inputValue);
      dispatch(clearAddressInputValidationError({ addressId, inputName }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        dispatch(setAddressInputValidationError({ addressId, inputName, validationError: error.message }));
      }
    }
  };
};
