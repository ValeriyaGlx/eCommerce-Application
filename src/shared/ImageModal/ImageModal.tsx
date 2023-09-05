import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './_ImageModal.scss';

interface ImageModalProps {
  items: React.ReactNode[];
  startIndex: number;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  items,
  startIndex,
  onClose,
}) => {
  const [mainIndex, setMainIndex] = useState<number>(startIndex);

  const smallThumbs = items.map((item, i) => (
    <div
      className={`thumb ${mainIndex === i ? 'active' : ''}`}
      key={`thumb-${i}`}
      onClick={() => {
        setMainIndex(i);
      }}
    >
      {item}
    </div>
  ));
  if (items.length === 1) {
    return (
      <div className='image-modal-overlay'>
        <div className='image-modal-content single-image'>
          <div className='modal-content-main-image'>{items[0]}</div>
        </div>
        <div className='image-modal-close' onClick={onClose}></div>
      </div>
    );
  }
  return (
    <div className='image-modal-overlay'>
      <div className='image-modal-content'>
        <div className='modal-main-image'>
          <AliceCarousel
            activeIndex={mainIndex}
            onSlideChanged={(e) => setMainIndex(e.item)}
            animationType='fadeout'
            animationDuration={100}
            disableDotsControls
            disableButtonsControls
            items={items}
            mouseTracking={false}
          />
        </div>
        <div className='small-thumbnails'>{smallThumbs}</div>
      </div>
      <div className='image-modal-close' onClick={onClose}></div>
    </div>
  );
};

export default ImageModal;
