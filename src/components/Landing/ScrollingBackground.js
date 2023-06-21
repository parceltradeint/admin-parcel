import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

const ScrollingBackground = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const backgroundImageList = [
    '/parcel-cover.jpg',
    '/parcel.jpg',
    '/whatsapp.png',
    // Add more image paths here
  ];

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const imageIndex = Math.floor(scrollPosition / window.innerHeight);
    setCurrentImage(imageIndex);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="h-screen">
      {backgroundImageList.map((image, index) => (
        <div
          key={index}
          className={classNames('h-full', {
            'opacity-100': index === currentImage,
            'opacity-0': index !== currentImage,
          })}
        >
          <div className="relative h-full">
            <Image
              src={image}
              alt={`Background Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollingBackground;
