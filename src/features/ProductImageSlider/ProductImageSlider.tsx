import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import './_ProductImageSlider.scss';
import ImageModal from '../../shared/ImageModal/ImageModal';

interface ProductImageSliderProps {
  items: React.ReactNode[];
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ items }) => {
  const [mainIndex, setMainIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (items.length === 1) {
    return (
      <div className='product-slider-container'>
        <div className='main-slide-container-single'>
          <div className='main-image single-image' onClick={openModal}>
            {items[0]}
          </div>
        </div>
        {isModalOpen && (
          <ImageModal
            items={items}
            startIndex={mainIndex}
            onClose={closeModal}
          />
        )}
      </div>
    );
  }

  const smallThumbs = items.map((item, i) => (
    <div
      className={`thumb ${mainIndex === i ? 'active' : ''}`}
      key={`thumb-${i}`}
      onClick={() => setMainIndex(i)}
    >
      {item}
    </div>
  ));

  return (
    <>
      <div className='product-slider-container'>
        <div className='main-slide-container'>
          <div className='main-image' onClick={openModal}>
            <AliceCarousel
              activeIndex={mainIndex}
              animationType='fadeout'
              animationDuration={200}
              disableDotsControls
              disableButtonsControls
              items={items}
              mouseTracking
            />
            <div
              className='btn-prev'
              onClick={(e) => {
                e.stopPropagation();
                setMainIndex((mainIndex - 1 + items.length) % items.length);
              }}
            >
              &lang;
            </div>
            <div
              className='btn-next'
              onClick={(e) => {
                e.stopPropagation();
                setMainIndex((mainIndex + 1) % items.length);
              }}
            >
              &rang;
            </div>
          </div>
          <div className='small-thumbnails'>{smallThumbs}</div>
        </div>
      </div>
      {isModalOpen && (
        <ImageModal items={items} startIndex={mainIndex} onClose={closeModal} />
      )}
    </>
  );
};

export default ProductImageSlider;
