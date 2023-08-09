import React from 'react';

import SignUpSection from '../../widgets/SignUpSection/SignUpSection';
import WelcomeBackSection from '../../widgets/WelcomeBackSection/WelcomeBackSection';
import './SignUp.scss';

export function SignUp() {
  return (
    <div className={'section-container'}>
      <SignUpSection />
      <WelcomeBackSection />
    </div>
  );
}

export default SignUp;
