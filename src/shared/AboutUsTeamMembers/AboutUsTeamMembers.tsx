import './_AboutUsTeamMembers.scss';
import React from 'react';

import { CartButton } from '../components/CartButton/CartButton';

interface AboutLink {
  imageUrl: string;
  title: string;
  links: string;
  icon: string;
  linkGithub: string;
  id?: number;
}

const AboutUsTeamMembers: React.FC<AboutLink> = ({
  imageUrl,
  title,
  links,
  icon,
  linkGithub,
  id,
}) => {
  return (
    <>
      <div className='aboutus'>
        <div className='aboutus-picture'>
          <img className='aboutus-photo' src={imageUrl} alt='members-photo' />
        </div>
        <div className='aboutus-description'>
          <div className='description'>
            <div className='description__logo'>
              <a href={links} target='_blank'>
                Link to CV
              </a>
              <CartButton
                key={id}
                to={linkGithub}
                src={icon}
                alt={icon}
                number={''}
              />
            </div>
            <div className='description__text'>{title}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUsTeamMembers;
