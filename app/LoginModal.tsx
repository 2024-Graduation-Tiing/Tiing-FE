'use client'

import { useRouter } from 'next/navigation'

const LoginModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  return (
    <div className="fixed left-0 top-0 z-50 box-border flex h-screen w-screen justify-center overflow-hidden bg-black bg-opacity-50">
      <div className="absolute top-[120px] w-[500px] rounded-16 bg-white px-[80px] py-[50px]">
        <img
          src="/modal_close_btn.svg"
          alt="close button"
          className="absolute right-[20px] top-[20px] cursor-pointer"
          onClick={() => {
            router.back()
          }}
        />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default LoginModal
