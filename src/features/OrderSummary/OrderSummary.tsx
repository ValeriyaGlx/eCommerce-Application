import React, { FC, useState } from 'react';

import './_OrderSummary.scss';
import Button from '../../shared/components/Button/Button';
import cards from '../../assets/img/debit-cards.png';

interface OrderSummaryProps {
  total: string;
  updatePricesWithCode: (value: string) => Promise<number>;
  commonDiscount: number;
}

const OrderSummary: FC<OrderSummaryProps> = ({
  total,
  updatePricesWithCode,
  commonDiscount,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueWithoutSpaces = event.target.value;
    setInputValue(inputValueWithoutSpaces);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  const handleButtonClick = async () => {
    if (inputValue.trim() === '') {
      setPromoMessage('Please enter a value.');
      setTimeout(() => setPromoMessage(''), 1000);
      return;
    }

    const res = await updatePricesWithCode(inputValue);
    if (res === 400) {
      setPromoMessage('Invalid promo code. Please try again.');
      setTimeout(() => setPromoMessage(''), 1000);
      return;
    } else {
      setPromoMessage('Promo code applied successfully.');
      setTimeout(() => setPromoMessage(''), 1000);
      setMessageColor('green');
    }
  };

  return (
    <div className={'OrderSummary-section'}>
      <h2>Order Summary</h2>
      <span>Got a promo code? Enter it here:</span>
      <div className={'promo-container'}>
        <input onChange={handleInputChange} onKeyDown={handleInputKeyPress} />
        <Button
          className={'get-disc_btn'}
          data={''}
          onClick={handleButtonClick}
        />
      </div>
      <span className={`promocode-message ${messageColor}`}>
        {promoMessage}
      </span>

      <div className={'total'}>
        <h3>Total:</h3>
        {commonDiscount !== 0 ? (
          <div className={'wrapper-prices'}>
            <div className={'new-price'}>${total}</div>
            <div className={'old-price'}>
              ${Math.ceil(commonDiscount * Number(total)).toFixed(2)}
            </div>
          </div>
        ) : (
          <div className={'price'}>${total}</div>
        )}
      </div>

      <Button className={'cart-buy-now-btn buy-now-button'} data={'Buy Now'} />
      <div className={'buy-info'}>
        <span>We Accept:</span>
        <img src={cards} alt={'cards'} />
      </div>
    </div>
  );
};

export default OrderSummary;
