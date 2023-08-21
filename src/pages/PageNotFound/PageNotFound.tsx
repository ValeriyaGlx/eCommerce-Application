import React from 'react';

import robot from '../../assets/icons/robot.png';
import './_PageNotFound.scss';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';

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
            style={{ width: '95%', height: '95%' }}
            src={robot}
            alt='robot'
          />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
