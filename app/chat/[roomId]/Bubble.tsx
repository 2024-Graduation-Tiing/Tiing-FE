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
      <div className="mb-2 flex justify-end">
        <div className="bg-blue-500 mr-2 rounded-lg p-3 text-white">{message.message}</div>
        <div className="text-xs text-gray-500">{message.sendingTime}</div>
      </div>
    )
  } else {
    return (
      <div className="mb-2 flex justify-start">
        <div className="mr-2 rounded-lg bg-gray-200 p-3 text-black">{message.message}</div>
        <div className="text-xs text-gray-500">{message.sendingTime}</div>
      </div>
    )
  }
}

export default Bubble
