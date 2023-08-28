import React from 'react';
import './_StudentsProfileCollage.scss';

interface StudentProfileCollageProps {
  imageUrl: string;
  className: string;
}

const StudentsProfileCollage: React.FC<StudentProfileCollageProps> = ({
  imageUrl,
  className,
}) => {
  return (
    <div className={className}>
      <img src={imageUrl} alt={'img'} />
    </div>
  );
};

export default StudentsProfileCollage;
