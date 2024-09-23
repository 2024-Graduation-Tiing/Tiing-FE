'use client';

import React, { useState } from 'react';

//
//
//

interface ProfileImageContainerProps {
  image: string[];
}

//
//
//

const ProfileImageContainer: React.FC<ProfileImageContainerProps> = ({
  image,
}) => {
  const [mainImage, setMainImage] = useState(image[0]);

  /**
   *
   */
  const handleImgClick = (img: string) => {
    if (img === mainImage) {
      setMainImage(image[0]);
    } else {
      setMainImage(img);
    }
  };

  return (
    <div className="mr-10 flex w-[20rem] flex-col">
      <img src={mainImage} className="rounded-16 mb-5 w-full shadow-xl" />
      <div className="grid w-fit grid-cols-3 gap-4">
        {image.slice(1).map((img) => (
          <img
            src={img}
            className="rounded-16 mb-3 cursor-pointer hover:scale-105 hover:duration-200"
            onClick={() => handleImgClick(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileImageContainer;
