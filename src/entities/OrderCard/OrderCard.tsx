import './_OrderCard.scss';
import example from '../../assets/img/404.png';
import Button from '../../shared/components/Button/Button';

const OrderCard = () => {
  return (
    <div>
      <div className={'order-card_separator'} />
      <div className={'order_card-container'}>
        <img src={example} alt={'img'} />
        <div className={'order_card-description'}>
          <div className={'order_inner'}>
            <h5>Product Name</h5>
            <Button className={''} data={'x'} onClick={() => {}} />
          </div>
        </div>
      </div>

      <div className={'order-card_separator'} />
    </div>
  );
};

export default OrderCard;
