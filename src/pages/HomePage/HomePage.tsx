import React from 'react';

import { Header } from '../../widgets/Header/Header';
import './_HomePage.scss';
import Footer from '../../widgets/Footer/Footer';

export function HomePage() {
  return (
    <div className='wrapper'>
      <div className={'container'}>
        <Header />
      </div>
      <Footer />
    </div>
  );
}
