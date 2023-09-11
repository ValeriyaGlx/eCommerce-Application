import './_AboutUsTeamMembers.scss';
import React from 'react';

import AccordionContainer from '../AccordionAboutUs/_AccordionAboutUs';

interface AboutLink {
  imageUrl: string;
  title: string;
  link: string;
  isActiveSection: boolean;
  setActiveIndex: (index: number | null) => void;
  sectionIndex: number;
  photo: string;
}

const AboutUsTeamMembers: React.FC<AboutLink> = ({
  imageUrl,
  title,
  link,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
  photo,
}) => {
  const toggleSection = () => {
    setActiveIndex(isActiveSection ? null : sectionIndex);
  };

  return (
    <>
      <div className={'about-container__pic'} onClick={toggleSection}>
        <img src={imageUrl} alt='members-photo' />
        {isActiveSection && (
          <AccordionContainer title={title} link={link} photo={photo} />
        )}
      </div>
    </>
  );
};
export default AboutUsTeamMembers;
