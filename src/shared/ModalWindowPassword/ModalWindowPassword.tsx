import './_ModalWindowPassword.scss';
import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import './_ModalWindowPasswordAnimation.scss';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { showPassword } from '../../features/formCommon/showPassword';
// eslint-disable-next-line max-len
import InputValidationPasswordAuthenticity from '../../entities/InputValidationPasswordAuthenticity/InputValidationPasswordAuthenticity';
// eslint-disable-next-line max-len
import InputValidationPasswordCurrent from '../../entities/InputValidationPasswordCurrent/InputValidationPasswordCurrent';
import InputValidationPasswordNew from '../../entities/InputValidationPasswordNew/InputValidationPasswordNew';
import { store } from '../../app/store/store';
import { closeModal } from '../../app/store/actions/modalSliceAction/modalSlice';
import Button from '../components/Button/Button';

type RootState = ReturnType<typeof store.getState>;
interface ModalProfileProps {
  isOpen: boolean;
  onClick?: () => void;
}

const ModalProfile: FC<ModalProfileProps> = ({ isOpen }) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  return (
    <>
      <CSSTransition in={isOpen} classNames='alert' timeout={300} unmountOnExit>
        <div className={'modal-background'}>
          <div className={'modal-window'}>
            <div className={'modal-inner'}>
              <h5>Current Password</h5>
              <InputValidationPasswordCurrent
                type={'password'}
                placeholder={'Password'}
                inputName={'password'}
                showPassword={showPassword}
              />
              <h5>New Password</h5>
              <InputValidationPasswordNew
                type={'password'}
                placeholder={'Password'}
                inputName={'password'}
                showPassword={showPassword}
              />
              <h5>Confirm Password</h5>
              <InputValidationPasswordAuthenticity
                type={'password'}
                placeholder={'Password'}
                inputName={'password'}
                showPassword={showPassword}
              />
            </div>
            <div
              className={'image-modal-close'}
              onClick={() => dispatch(closeModal())}
            ></div>
            <div className={'image-modal-save'}>
              <Button
                className={'profile-button'}
                data={'Save'}
                onClick={() => {}}
              />
              <Button
                className={'profile-button'}
                data={'Cancel'}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalProfile;
