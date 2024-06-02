import React from 'react';

interface RatioImgContainerProps {
  imgSrc: any,
  width: String,
  radius: String,
}

const RatioImgContainer = ({imgSrc, width, radius}:RatioImgContainerProps) => {
  const container_style=`${width} ${radius} flex justify-center items-center overflow-hidden`
  return (
    <div className={container_style} style={{aspectRatio:'3/4'}}>
      <img className='w-full h-full object-cover' src={imgSrc} alt='cover_image'/>
    </div>
  );
};

export default RatioImgContainer;
