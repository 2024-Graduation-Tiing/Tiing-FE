import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'

interface ProfileInfoProps {
  id: number
  name: string
  image: string
  keywords: string[]
}

const ProfileCard: NextPage<ProfileInfoProps> = ({
  id,
  name,
  image,
  keywords,
}: ProfileInfoProps) => {
  return (
    <div>
      <Link href="/profile/1">
        <img src={image} alt="profile_img" className="mb-3 w-[220px] rounded-16" />
      </Link>
      <p className="text-md mb-2 font-medium">{name}</p>
      <div className="grid grid-cols-3 gap-x-2">
        {keywords?.map((keyword) => <span className="keyword text-xs">{keyword}</span>)}
      </div>
    </div>
  )
}

export default ProfileCard
