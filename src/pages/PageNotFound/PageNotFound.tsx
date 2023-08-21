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
          <h3>Oops... Page not found</h3>
          <ButtonWithRoute
            className={'pagenotfound__button'}
            path={'/'}
            data={'Go Back'}
          />
        </div>
        <div className={'pagenotfound-container'}>
          <img
            className={'pagenotfound-container-img'}
            style={{ width: '100%', height: '100%' }}
            src={robot}
            alt='robot'
          />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
