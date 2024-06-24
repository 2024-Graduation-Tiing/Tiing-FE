import React, { ReactNode } from 'react'

//
//
//

interface RatioImgContainerProps {
  imgSrc?: any
  width?: string
  radius?: string
  blur?: string
  children?: ReactNode
  containerStyle?: string
}

//
//
//

const RatioImgContainer = ({
  imgSrc,
  width,
  radius,
  blur,
  children,
  containerStyle,
}: RatioImgContainerProps) => {
  const imgContainerStyle = `${width} $ ${radius} ${blur} flex justify-center items-center overflow-hidden`

  return (
    <div
      className={containerStyle ? containerStyle : imgContainerStyle}
      style={{ aspectRatio: '3/4' }}
    >
      {imgSrc ? (
        <img className="h-full w-full object-cover" src={imgSrc} alt="cover_image" />
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

export default RatioImgContainer
