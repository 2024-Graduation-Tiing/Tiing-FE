import ProfileCard from './ProfileCard'

type ProfileInfo = {
  id: number
  name: string
  image: string
  keywords: string[]
}

export default function Profiles() {
  const profileInfo: ProfileInfo[] = [
    {
      id: 1,
      name: '차해율',
      image: '/profile_img.png',
      keywords: ['🧼 깨끗한', '🐺 시크한', '🎀 키치한'],
    },
    {
      id: 2,
      name: '아비브 SNS 광고',
      image: 'proposal_img.png',
      keywords: ['🌱 풋풋한', '👓 지적인', '☕ 따뜻한'],
    },
    { id: 3, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 4, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 5, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 6, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 7, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 8, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 9, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 10, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 11, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 12, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 13, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 14, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 15, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 16, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 17, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 18, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 19, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
    { id: 20, name: '차해율', image: '/profile_img.png', keywords: ['🧼 깨끗한', '🐺 시크한'] },
  ]

  return (
    <div className="mt-10 grid grid-cols-5 gap-[24px]">
      {profileInfo.map((item: ProfileInfo) => (
        <div key={item.id}>
          <ProfileCard {...item} />
        </div>
      ))}
    </div>
  )
}
