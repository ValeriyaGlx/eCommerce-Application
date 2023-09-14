import { useEffect, useState } from 'react';

import './_PromocodesMainInfo.scss';

const PromocodesMainInfo = () => {
  const promoCodes = [
    'Unlock 15% Discount for Everything! Code: HELLODIGI',
    'Get an Exclusive 5% Discount! Code: FIVEDISCOUNT',
  ];
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promoCodes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={'promocodes-container'}>
      <div className='promo-code'>{promoCodes[currentPromoIndex]}</div>
    </div>
  );
};

export default PromocodesMainInfo;
