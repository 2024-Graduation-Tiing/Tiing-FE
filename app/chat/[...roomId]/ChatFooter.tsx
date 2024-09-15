import { IconButton, SvgIcon } from '@mui/material'
import React, { useRef, useState } from 'react'

//
//
//

interface ChatFooterProps {
  sendMessage: (content: string | File) => void
}

//
//
//

const ChatFooter: React.FC<ChatFooterProps> = ({ sendMessage }) => {
  const [input, setInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleSendMessage = () => {
    if (input.trim()) {
      // 공백만 입력한 경우 메시지 전송 안됨
      sendMessage(input)
      setInput('')
    }
  }

  const handleIconClick = () => {
    // 숨겨진 파일 입력 필드를 클릭하도록 트리거
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files
    if (file) {
      sendMessage(file[0])
      event.target.value = ''
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

  const renderSendIcon = () => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.7232 1.75895C15.6613 1.44624 16.5538 2.33873 16.2411 3.27684L12.1845 15.4466C11.8561 16.4318 10.5162 16.563 10.0029 15.6603L7.63278 11.4921C7.36587 11.0227 6.97721 10.6341 6.50781 10.3672L2.33973 7.9971C1.437 7.48378 1.56824 6.14392 2.55342 5.81553L14.7232 1.75895Z"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    )
  }

  return (
    <div className="flex items-center items-stretch gap-5 bg-white px-10 py-4">
      <div className="flex-none">
        <IconButton size="medium" onClick={handleIconClick}>
          <SvgIcon>{renderPictureIcon()}</SvgIcon>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }} // 화면에서 숨김
            onChange={handleFileChange} // 파일 선택 시 호출
            accept="image/*" // 이미지 파일만 허용
          />
        </IconButton>
      </div>
      <div className="flex grow items-center">
        <input
          className="h-full grow rounded-3xl bg-blue bg-opacity-10 px-5 py-2 outline-none"
          placeholder="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage()
          }}
        />
      </div>
      <div
        className="aspect-1/1 hover:bg-mediumblue flex h-full flex-none cursor-pointer items-center justify-center rounded-xl bg-blue"
        onClick={() => handleSendMessage()}
      >
        {renderSendIcon()}
      </div>
    </div>
  )
}

export default ChatFooter
