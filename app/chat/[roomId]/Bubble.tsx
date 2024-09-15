import Image from 'next/image'
import React from 'react'

//
//
//

type Message = {
  sender: string
  message: string
  sendingTime: string
}

type BubbleProps = {
  message: Message
  isMine: boolean
}

//
//
//

const isImageUrl = (url: string) => {
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null
}

const Bubble = ({ message, isMine }: BubbleProps) => {
  const isImage = isImageUrl(message.message)

  if (isMine) {
    return (
      <div className="mb-3 flex flex-col items-end">
        <div className="mb-1 w-fit text-pretty text-pretty rounded-b-xl rounded-l-xl bg-blue p-3 text-sm text-white">
          {isImage ? (
            <Image src={message.message} width={300} height={300} alt="sent image" />
          ) : (
            message.message
          )}
        </div>
        <div className="text-xs text-gray-500">{message.sendingTime}</div>
      </div>
    )
  } else {
    return (
      <div className="mb-3 flex flex-col">
        <div className="mb-1 w-fit rounded-b-xl rounded-r-xl bg-skyblue p-3 text-sm text-darkgray">
          {message.message}
        </div>
        <div className="text-xs text-gray-500">{message.sendingTime}</div>
      </div>
    )
  }
}

export default Bubble
