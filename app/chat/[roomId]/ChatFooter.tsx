import { IconButton, SvgIcon } from '@mui/material'
import React, { useState } from 'react'

//
//
//

interface ChatFooterProps {
  sendMessage: (content: string) => void
}

//
//
//

const ChatFooter: React.FC<ChatFooterProps> = ({ sendMessage }) => {
  const [input, setInput] = useState('')

  const handleSendMessage = () => {
    if (input.trim()) {
      // 공백만 입력한 경우 메시지 전송 안됨
      sendMessage(input)
      setInput('')
    }
  }

  const renderPictureIcon = () => {
    return (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#5B5C5E" strokeWidth="1.5" />
        <path
          d="M2.5 17.5L4.7592 15.8863C5.47521 15.3749 6.45603 15.456 7.07822 16.0782L8.15147 17.1515C8.6201 17.6201 9.3799 17.6201 9.84853 17.1515L14.8377 12.1623C15.496 11.504 16.5476 11.4563 17.2628 12.0523L22 16"
          stroke="#5B5C5E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="2"
          cy="2"
          r="2"
          transform="matrix(-1 0 0 1 10 6)"
          stroke="#5B5C5E"
          strokeWidth="1.5"
        />
      </svg>
    )
  }

  return (
    <div className="flex items-center gap-5 bg-white px-12 py-4">
      <div className="flex-none">
        <IconButton size="large">
          <SvgIcon>{renderPictureIcon()}</SvgIcon>
        </IconButton>
      </div>
      <div className="flex grow items-center gap-3">
        <input
          className="grow rounded-3xl bg-blue bg-opacity-10 px-5 py-2 outline-none"
          placeholder="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage()
          }}
        />
        <div className="flex-none">
          <button onClick={handleSendMessage}>send</button>
        </div>
      </div>
    </div>
  )
}

export default ChatFooter
