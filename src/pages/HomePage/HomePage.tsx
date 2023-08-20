import React from 'react';

import { Header } from '../../widgets/Header/Header';
import './HomePage.scss';
import MainHome from '../../widgets/mainHome/MainHome';

export function HomePage() {
  return (
    <div className='wrapper'>
      <div className={'container'}>
        <Header />
        <MainHome />
      </div>
    </div>
  );
}
