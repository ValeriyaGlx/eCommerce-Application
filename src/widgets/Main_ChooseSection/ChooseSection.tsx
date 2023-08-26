import './_ChooseSection.scss';

import documentation from '../../assets/img/documentation.png';
import support from '../../assets/img/support.png';
import resource from '../../assets/img/resource.png';
import update from '../../assets/img/update.png';

const ChooseSection = () => {
  return (
    <section className={'main-choose'}>
      <h2 className={'main-choose__headline'}>Why Choose Us</h2>
      <div className={'main-wrapper'}>
        <div className={'documentation'}>
          <div className={'documentation-container documentation-border'}>
            <div
              className={
                'documentation-container__img documentation-container__gradient'
              }
            >
              <img src={documentation} alt={'img'} />
            </div>
            <p className={'documentation-container__name'}>
              Well Documentation
            </p>
            <h5>Comprehensive course descriptions.</h5>
          </div>
        </div>
        <div className={'documentation'}>
          <div className={'documentation-container documentation-border'}>
            <div className={'documentation-container__img'}>
              <img src={support} alt={'img'} />
            </div>
            <p className={'documentation-container__name'}>Live Support</p>
            <h5>Get real-time answers to your questions.</h5>
          </div>
        </div>
        <div className={'documentation'}>
          <div className={'documentation-container documentation-border'}>
            <div className={'documentation-container__img'}>
              <img src={resource} alt={'img'} />
            </div>
            <p className={'documentation-container__name'}>Free Resource</p>
            <h5>Access free learning materials for preview.</h5>
          </div>
        </div>
        <div className={'documentation'}>
          <div className={'documentation-container documentation-border'}>
            <div className={'documentation-container__img'}>
              <img src={update} alt={'img'} />
            </div>
            <p className={'documentation-container__name'}>Regular Update</p>
            <h5>Subscribe to our newsletter for the freshest updates.</h5>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ChooseSection;
