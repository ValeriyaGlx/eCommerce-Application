import './_AboutUs.scss';

import AboutUsTeamPhoto from '../../shared/AboutUsTeamPhoto/AboutUsTeamPhoto';
import AboutUsTeamMembers from '../../shared/AboutUsTeamMembers/AboutUsTeamMembers';
import { ABOUTUS_LINKS_DATA as aboutLinks } from '../../constants/aboutUsConstants/aboutUsConstants';

const AboutUs = () => {
  return (
    <>
      <div className='about'>
        <AboutUsTeamPhoto />
        <div className='about-container__photos'>
          {aboutLinks.map(({ id, img, title, link, photo, links }) => (
            <AboutUsTeamMembers
              key={id}
              imageUrl={img}
              title={title}
              link={link}
              photo={photo}
              links={links}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
