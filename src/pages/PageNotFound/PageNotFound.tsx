import React from 'react';

import './_PageNotFound.scss';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';

const PageNotFound = () => {
  return (
    <div>
      <div className='pagenotfound'>
        <div className={'pagenotfound-text'}>
          <h1>404</h1>
          <h3>Oops... Page not found</h3>
          <ButtonWithRoute
            className={'pagenotfound__button'}
            path={'/'}
            data={'Go Back'}
          />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
