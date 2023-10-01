import React from 'react';

import './_AboutUsTeamMembers.scss';
import { LinkGit } from '../components/Link/Link';

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
              <LinkGit key={id} to={linkGithub} src={icon} alt={icon} />
            </div>
            <div className='description__text'>{title}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUsTeamMembers;
