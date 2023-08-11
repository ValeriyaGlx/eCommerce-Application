import React from 'react';

import robot from '../../assets/icons/robot.png';
import './PageNotFound.scss';
import ButtonWithRoute from '../../entities/ButtonWithRoute/ButtonWithRoute';

const PageNotFound = () => {
  return (
    <div>
      <div className='pagenotfound'>
        <div className={'pagenotfound-text'}>
          <h1>404 page</h1>
          <h3>Ops... Page not found</h3>
          <ButtonWithRoute
            className={'pagenotfound__button'}
            path={'/'}
            data={'Go Back'}
          />
        </div>
        <div className={'pagenotfound__picture'}>
          <img
            className={'pagenotfound___picture__picture'}
            style={{ width: '100%', height: '61%' }}
            src={robot}
            alt='robot'
          />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
