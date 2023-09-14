import React, { FC, useState } from 'react';

import './_OrderSummary.scss';
import Button from '../../shared/components/Button/Button';
import cards from '../../assets/img/debit-cards.png';
import { implementPromoCode } from '../../entities/ApiCart/addProductToCart';

interface OrderSummaryProps {
  total: string;
}

const OrderSummary: FC<OrderSummaryProps> = ({ total }) => {
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

  const handleButtonClick = () => {
    if (inputValue.trim() === '') {
      setPromoMessage('Please enter a value.');
      setTimeout(() => setPromoMessage(''), 1000);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await implementPromoCode(inputValue);
        if (res === 400) {
          setPromoMessage('Invalid promo code. Please try again.');
          setTimeout(() => setPromoMessage(''), 1000);
          return;
        } else {
          setPromoMessage('Promo code applied successfully.');
          setTimeout(() => setPromoMessage(''), 1000);
          setMessageColor('green');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
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
        <div className={''}>${total}</div>
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
