import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './_ProductImageSlider.scss';

interface ProductImageSliderProps {
  items: React.ReactNode[];
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ items }) => {
  const [mainIndex, setMainIndex] = useState<number>(0);

  if (items.length === 1) {
    return (
      <div className='product-slider-container'>
        <div className='main-slide-container-single'>
          <div className='main-image single-image'>{items[0]}</div>
        </div>
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
    <div className='product-slider-container'>
      <div className='main-slide-container'>
        <div className='main-image'>
          <AliceCarousel
            activeIndex={mainIndex}
            animationType='fadeout'
            animationDuration={800}
            disableDotsControls
            disableButtonsControls
            items={items}
            mouseTracking
          />
          <div
            className='btn-prev'
            onClick={() =>
              setMainIndex((mainIndex - 1 + items.length) % items.length)
            }
          >
            &lang;
          </div>
          <div
            className='btn-next'
            onClick={() => setMainIndex((mainIndex + 1) % items.length)}
          >
            &rang;
          </div>
        </div>
        <div className='small-thumbnails'>{smallThumbs}</div>
      </div>
    </div>
  );
};

export default ProductImageSlider;
