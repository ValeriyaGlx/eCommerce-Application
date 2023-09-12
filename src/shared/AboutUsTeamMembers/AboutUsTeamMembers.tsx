import './_AboutUsTeamMembers.scss';
import React from 'react';

interface AboutLink {
  imageUrl: string;
  title: string;
  link: string;
  photo: string;
  links: string;
}

const AboutUsTeamMembers: React.FC<AboutLink> = ({
  imageUrl,
  title,
  link,
  photo,
  links,
}) => {
  return (
    <>
      <div className='aboutus'>
        <div className='aboutus-picture'>
          <img src={imageUrl} alt='members-photo' />
        </div>
        <div className='aboutus-description'>
          <div className='description'>
            <div className='description__logo'>
              <a href={links} target='_blank'>
                Link to CV
              </a>
              <a href={link} target='_blank' className='my-link'>
                <img src={photo} alt='picture' />
              </a>
            </div>
            <div className='description__text'>{title}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUsTeamMembers;
