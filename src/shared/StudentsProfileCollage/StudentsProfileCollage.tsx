import React from 'react';
import './_StudentsProfileCollage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import collage from '../../assets/img/collage.svg';
import Button from '../components/Button/Button';
import ModalProfile from '../ModalWindowPassword/ModalWindowPassword';
import { openModal } from '../../app/store/actions/modalSliceAction/modalSlice';
import { store } from '../../app/store/store';

type RootState = ReturnType<typeof store.getState>;
const StudentsProfileCollage = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const showModal = useSelector((state: RootState) => state.modal.isOpen);

  return (
    <>
      <ModalProfile isOpen={showModal} />
      <div className={'profile-wrapper'}>
        <div className={'profile-container__img'}>
          <div className={'profile-container__button'}>
            <Button
              className={'profile-button'}
              data={'Change the Password'}
              onClick={() => dispatch(openModal())}
            />
          </div>
          <img src={collage} alt={'img'} />
        </div>
      </div>
    </>
  );
};

export default StudentsProfileCollage;
