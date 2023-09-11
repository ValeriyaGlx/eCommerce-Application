import React from 'react';
import './_AccordionAboutUs.scss';

interface AccordionContainerProps {
  title: string;
  link: string;
  photo: string;
}
const AccordionAboutUs: React.FC<AccordionContainerProps> = ({
  title,
  link,
  photo,
}) => {
  return (
    <div className='accordion'>
      <div className='accordion-description'>
        <div className='accordion-description__text'>{title}</div>
        <a href={link} target='_blank'>
          <img src={photo} alt='picture' />
        </a>
      </div>
    </div>
  );
};

export default AccordionAboutUs;
