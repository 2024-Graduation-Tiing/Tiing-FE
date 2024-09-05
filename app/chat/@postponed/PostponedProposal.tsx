import { createChatRoom } from '@/app/api/chat/request'
import { useRouter } from 'next/navigation'
import React from 'react'

//
//
//

type Proposal = {
  params: {
    receiverId: string
    title: string
  }
}

const PostponedProposal = ({ params }: Proposal) => {
  const router = useRouter()

  const handleOnClick = async () => {
    const roomId = await createChatRoom()
    if (roomId) {
      router.push(`/chat/${roomId}`)
    } else {
      console.log('Failed to create chat room')
    }
  }
  return (
    <div className="w-full py-4">
      <div className="mb-2 font-semibold leading-relaxed">{params.title}</div>
      <button className="btn-default w-1/3 text-xs" onClick={handleOnClick}>
        프로필 보내기
      </button>
    </div>
  )
}

export default PostponedProposal
