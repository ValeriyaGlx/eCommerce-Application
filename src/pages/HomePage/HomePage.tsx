import React from 'react';

import './_HomePage.scss';
import InnerSection from '../../widgets/Main_InnerSection/InnerSection';
import ChooseSection from '../../widgets/Main_ChooseSection/ChooseSection';

export function HomePage() {
  return (
    <>
      <InnerSection />
      <ChooseSection />
    </>
  );
}
