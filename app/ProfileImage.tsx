import Image from 'next/image';
import React from 'react';

//
//
//

interface ImageProps {
  imgSrc: string | undefined;
  alt: string;
  width?: string;
  radius?: string;
  blur?: string;
  position?: string;
  children?: ReactNode;
  containerStyle?: string;
}

//
//
//

const ProfileImage = (props: ImageProps) => {
  const imgContainerStyle = `${props.width} $ ${props.radius} ${props.blur} relative aspect-3/4 overflow-hidden`;

  if (!props.imgSrc) {
    return (
      <div className={imgContainerStyle}>
        <div className="bg-stone-200 w-full h-full" />
      </div>
    );
  }
  return (
    <div className={imgContainerStyle}>
      <Image
        src={props.imgSrc}
        alt={props.alt}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default ProfileImage;
