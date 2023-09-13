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
          {aboutLinks.map(({ id, img, title, links, linkGithub, icon }) => (
            <AboutUsTeamMembers
              key={id}
              imageUrl={img}
              title={title}
              links={links}
              linkGithub={linkGithub}
              icon={icon}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
