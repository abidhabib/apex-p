import React, { useState } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider">
      <div className="image-slider__container">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`image-slider__slide ${
              index === currentImageIndex ? 'image-slider__slide--active' : ''
            }`}
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        ))}
      </div>
      <button className="image-slider__btn-prev" onClick={prevImage}>
        &lt;
      </button>
      <button className="image-slider__btn-next" onClick={nextImage}>
        &gt;
      </button>
    </div>
  );
};

export default ImageSlider;
