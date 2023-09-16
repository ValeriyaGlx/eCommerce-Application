import React from 'react';

import './_HomePage.scss';
import InnerSection from '../../widgets/Main_InnerSection/InnerSection';
import ChooseSection from '../../widgets/Main_ChooseSection/ChooseSection';
import PromocodesMainInfo from '../../shared/PromocodesMainInfo/PromocodesMainInfo';

export function HomePage() {
  return (
    <>
      <PromocodesMainInfo />
      <InnerSection />
      <ChooseSection />
    </>
  );
}
