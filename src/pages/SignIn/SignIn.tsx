import React from 'react';

import SignInSection from '../../widgets/SignInSection/SignInSection';
import NewHereSection from '../../widgets/NewHereSection/NewHereSection';

export function SignIn() {
  return (
    <div className={'section-container'}>
      <SignInSection />
      <NewHereSection />
    </div>
  );
}
