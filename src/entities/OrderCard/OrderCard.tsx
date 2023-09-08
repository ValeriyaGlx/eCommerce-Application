import './_OrderCard.scss';
import example from '../../assets/img/404.png';
import Button from '../../shared/components/Button/Button';
import OrderCounter from '../../shared/OrderCounter/OrderCounter';

const OrderCard = () => {
  return (
    <div>
      <div className={'order-card_separator'} />
      <div className={'order_card-container'}>
        <img src={example} alt={'img'} />
        <div className={'order_card-description'}>
          <div className={'order_inner'}>
            <h5>Product Name</h5>
            <Button
              className={'delete-from-cart'}
              data={''}
              onClick={() => {}}
            />
          </div>
          <div className={'order_amounts'}>
            <div className={'order_amounts-numberof'}>
              <span>1 x $0.00</span>
              <OrderCounter initialValue={1} />
            </div>
            <div className={'order_amounts-prices'}>
              <span className={'old-price'}>$100</span>
              <span className={'new-price'}>$0.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className={'order-card_separator'} />
    </div>
  );
};

export default OrderCard;
