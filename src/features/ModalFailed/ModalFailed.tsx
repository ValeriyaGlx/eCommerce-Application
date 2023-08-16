import './_ModalFailed.scss';
import React from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import './_ModalFailedAnimation.scss';
import logoFailed from '../../assets/icons/modal-logo-failed.png';
import { store } from '../../app/store/store';
import { closeModal } from '../../app/store/modalSliceAction/modalSlice';

type RootState = ReturnType<typeof store.getState>;

const ModalFailed = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const clickButton = () => {
    dispatch(closeModal());
  };
  const isOpen = store.getState().modal.isOpen;
  return (
    <>
      <CSSTransition in={isOpen} classNames='alert' timeout={300} unmountOnExit>
        <div className={'background'}>
          <div className={'modal'}>
            <div className={'modal-content'}>
              <img src={logoFailed} alt={'logo-failed'} />
              <h2>Login Failed!</h2>
              <p>Please, recheck the username and password and try again</p>
              <button onClick={clickButton}>TRY AGAIN</button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalFailed;
