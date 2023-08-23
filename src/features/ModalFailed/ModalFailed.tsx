import './_ModalFailed.scss';
import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import './_ModalFailedAnimation.scss';
import logoFailed from '../../assets/icons/modal-logo-failed.png';

interface ModalSignPageProps {
  logo: typeof logoFailed;
  h2: string;
  p: string;
  buttonValue: string;
  isOpen: boolean;
  onClick: () => void;
  isSignUpSuccessful?: boolean;
}

const ModalSignPage: FC<ModalSignPageProps> = ({
  logo,
  h2,
  p,
  buttonValue,
  isOpen,
  onClick,
  isSignUpSuccessful,
}) => {
  return (
    <>
      <CSSTransition in={isOpen} classNames='alert' timeout={300} unmountOnExit>
        <div className={'background'}>
          <div className={'modal'}>
            <div className={'modal-content'}>
              <img src={logo} alt={'logo'} loading='lazy' />
              <h2>{h2}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{p}</p>
              {!isSignUpSuccessful && (
                <button onClick={onClick}>{buttonValue}</button>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalSignPage;
