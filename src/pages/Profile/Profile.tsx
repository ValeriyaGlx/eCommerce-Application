import React from 'react';

import { Header } from '../../widgets/Header/Header';
import Footer from '../../widgets/Footer/Footer';

export function Profile() {
  return (
    <div className={'container'}>
      <Header />

      <div>Profile</div>
      <Footer />
    </div>
  );
}

export default Profile;
