import React from 'react';

import './_SignUp.scss';
import WelcomeBackSection from '../../widgets/WelcomeBackSection/WelcomeBackSection';
import SignUpSection from '../../widgets/SignUpSection/view/SignUpSection';

export function SignUp() {
  return (
    <div className={'section-container'}>
      <SignUpSection />
      <WelcomeBackSection />
    </div>
  );
}

export default SignUp;
