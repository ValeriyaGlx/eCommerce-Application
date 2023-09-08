import './_OrderSummary.scss';
import Button from '../../shared/components/Button/Button';
import cards from '../../assets/img/debit-cards.png';

const OrderSummary = () => {
  return (
    <div className={'OrderSummary-section'}>
      <h2>Order Summary</h2>
      <span>Got a promo code? Enter it here:</span>
      <div className={'promo-container'}>
        <input />
        <Button className={'get-disc_btn'} data={''} />
      </div>

      <div className={'total'}>
        <h3>Total:</h3>
        <div className={''}>$100.00</div>
      </div>

      <Button className={'buy-now-button'} data={'Buy Now'} />
      <div className={'buy-info'}>
        <span>We Accept:</span>
        <img src={cards} alt={'cards'} />
      </div>
    </div>
  );
};

export default OrderSummary;
