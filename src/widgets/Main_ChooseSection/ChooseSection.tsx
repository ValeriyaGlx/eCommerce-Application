import ChooseCard from '../../shared/components/ChooseCard/ChooseCard';
import { CHOOSE_LINKS_DATA as chooseLinks } from '../../constants/chooseConstants/chooseConstants';

import './_ChooseSection.scss';
const ChooseSection = () => {
  return (
    <section className={'main-choose'}>
      <h2 className={'main-choose__headline'}>Why Choose Us</h2>
      <div className={'main-wrapper'}>
        {chooseLinks.map(({ id, title, description, img }) => (
          <ChooseCard
            key={id}
            imageUrl={img}
            title={title}
            description={description}
          />
        ))}
      </div>
    </section>
  );
};
export default ChooseSection;
