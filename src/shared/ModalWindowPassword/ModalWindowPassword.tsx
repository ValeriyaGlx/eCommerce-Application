import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import './_ModalWindowPasswordAnimation.scss';
import './_ModalWindowPassword.scss';
import InputValidationSignUp from '../../entities/InputValidationSignUp/view/InputValidationSignUp';
import InputValidationPassword from '../../entities/InputValidationPassword/InputValidationPassword';

interface ModalProfileProps {
  isOpen: boolean;
  onClick?: () => void;
}

const ModalProfile: FC<ModalProfileProps> = ({ isOpen }) => {
  return (
    <CSSTransition in={isOpen} classNames='alert' timeout={300} unmountOnExit>
      <div className={'modal-background'}>
        <div className={'modal-window'}>
          <div className={'modal-inner'}>
            <h2>Change the Password</h2>
            <h5>Current Password</h5>
            <InputValidationPassword
              type={'password'}
              placeholder={'Current Password'}
              inputName={'currentPassword'}
            />
            <h5>New Password</h5>
            <InputValidationSignUp
              type={'password'}
              placeholder={'New Password'}
              inputName={'password'}
              changePassword={true}
            />
            <InputValidationPassword
              type={'password'}
              placeholder={'Confirm Password'}
              inputName={'confirmPassword'}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ModalProfile;
