import './_ModalWindowPassword.scss';
import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import './_ModalWindowPasswordAnimation.scss';
// eslint-disable-next-line max-len
import InputValidationPasswordAuthenticity from '../../entities/InputValidationPasswordAuthenticity/InputValidationPasswordAuthenticity';
// eslint-disable-next-line max-len
import InputValidationPasswordCurrent from '../../entities/InputValidationPasswordCurrent/InputValidationPasswordCurrent';
import InputValidationPasswordNew from '../../entities/InputValidationPasswordNew/InputValidationPasswordNew';

interface ModalProfileProps {
  isOpen: boolean;
  onClick: () => void;
}

const ModalProfile: FC<ModalProfileProps> = ({ isOpen }) => {
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
              />
              <h5>New Password</h5>
              <InputValidationPasswordNew
                type={'password'}
                placeholder={'Password'}
                inputName={'password'}
              />
              <h5>Confirm Password</h5>
              <InputValidationPasswordAuthenticity
                type={'password'}
                placeholder={'Password'}
                inputName={'password'}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalProfile;
