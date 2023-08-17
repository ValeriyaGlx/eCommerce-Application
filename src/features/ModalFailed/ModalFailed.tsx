import './_ModalFailed.scss';
import React, { FC } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import './_ModalFailedAnimation.scss';
import logoFailed from '../../assets/icons/modal-logo-failed.png';
import { store } from '../../app/store/store';
import { closeModal } from '../../app/store/modalSliceAction/modalSlice';

type RootState = ReturnType<typeof store.getState>;

interface ModalSignPageProps {
  logo: typeof logoFailed;
  h2: string;
  p: string;
  buttonValue: string;
  isOpen: boolean;
  onClick: () => void;
}

const ModalSignPage: FC<ModalSignPageProps> = ({
  logo,
  h2,
  p,
  buttonValue,
  isOpen,
  onClick,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  return (
    <>
      <CSSTransition in={isOpen} classNames='alert' timeout={300} unmountOnExit>
        <div className={'background'}>
          <div className={'modal'}>
            <div className={'modal-content'}>
              <img src={logo} alt={'logo'} />
              <h2>{h2}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{p}</p>
              <button onClick={onClick}>{buttonValue}</button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalSignPage;
