import React, { useState } from 'react';
import './_AboutUs.scss';

import AboutUsTeamPhoto from '../../shared/AboutUsTeamPhoto/AboutUsTeamPhoto';
import AboutUsTeamMembers from '../../shared/AboutUsTeamMembers/AboutUsTeamMembers';
import { ABOUTUS_LINKS_DATA as aboutLinks } from '../../constants/aboutUsConstants/aboutUsConstants';
import school from '../../assets/img/RsSchool.png';

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <>
      <div className='about'>
        <AboutUsTeamPhoto />
        <div className='about-container__photos'>
          {aboutLinks.map(({ id, img, title, link, photo }) => (
            <AboutUsTeamMembers
              key={id}
              imageUrl={img}
              title={title}
              isActiveSection={id === activeIndex}
              setActiveIndex={setActiveIndex}
              sectionIndex={id}
              link={link}
              photo={photo}
            />
          ))}
        </div>
        <div className='about-container__logo'>
          <a href='https://rs.school/' target='_blank'>
            <img src={school} alt='school-logo' />
          </a>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
