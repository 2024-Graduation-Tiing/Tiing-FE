import Login from '@/app/Login'
import LoginModal from '@/app/LoginModal'

export default function Page() {
  return (
    <div className="flex justify-center">
      <LoginModal>
        <Login />
      </LoginModal>
    </div>
  )
}
