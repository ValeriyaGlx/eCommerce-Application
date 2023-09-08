import './_InnerSection.scss';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';

const InnerSection = () => {
  return (
    <section className={'main-inner'}>
      <div>
        <h1>
          World Top Education:{' '}
          <span className={'main-inner-colorful'}>Unlock Your Potential</span>
        </h1>
        <p>
          Experience the pinnacle of education with World Top Education. Elevate
          your skills and knowledge at DigiSet for a future of limitless
          possibilities.
        </p>
        <ButtonWithRoute
          className={'button-signIn button-main-products'}
          path={'/products'}
          data={'Buy Now'}
        />
      </div>
      <div className={'main-inner_img'}></div>
    </section>
  );
};

export default InnerSection;
