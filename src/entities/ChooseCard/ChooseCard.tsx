import React from 'react';
import './_ChooseCard.scss';

interface ChooseLink {
  title: string;
  description: string;
  imageUrl: string;
}
const ChooseCard: React.FC<ChooseLink> = ({ imageUrl, description, title }) => {
  console.log(imageUrl, description, title);
  return (
    <div className={'documentation'}>
      <div className={'documentation-container documentation-border'}>
        <div className={'documentation-container__img'}>
          <img src={imageUrl} alt={'img'} />
        </div>
        <p className={'documentation-container__name'}>{title}</p>
        <h5>{description}</h5>
      </div>
    </div>
  );
};
export default ChooseCard;
