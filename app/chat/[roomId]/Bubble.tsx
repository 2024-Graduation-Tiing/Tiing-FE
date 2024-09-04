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

const Bubble = ({ message, isMine }: BubbleProps) => {
  if (isMine) {
    return (
      <div className="mb-3 flex flex-col justify-end">
        <div className="mb-1	w-fit text-pretty text-pretty rounded-b-xl rounded-l-xl bg-blue p-3 text-sm text-white">
          {message.message}
        </div>
        <div className="self-end text-xs text-gray-500">{message.sendingTime}</div>
      </div>
    )
  } else {
    return (
      <div className="mb-3 flex flex-col justify-start">
        <div className="bg-skyblue mb-1 w-fit rounded-b-xl rounded-r-xl p-3 text-sm text-darkgray">
          {message.message}
        </div>
        <div className="text-xs text-gray-500">{message.sendingTime}</div>
      </div>
    )
  }
}

export default Bubble
