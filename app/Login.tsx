import Link from 'next/link'

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/logo.svg" alt="logo" className="mb-[20px]" />
      <h3 className="mb-[28px] text-2xl font-bold">로그인</h3>
      <form className="flex flex-col justify-center">
        <input
          type="text"
          placeholder="Email"
          autoComplete="true"
          className="mb-[16px] h-[48px] w-[382px] rounded-12 border-[1px] border-lightgray pl-[28px] text-sm outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="true"
          className="mb-[44px] h-[48px] w-[382px] rounded-12 border-[1px] border-lightgray pl-[28px] text-sm outline-none"
        />
        <button
          type="submit"
          className="mb-[24px] h-[48px] w-[382px] rounded-12 bg-blue font-semibold text-white"
        >
          Sign In
        </button>
      </form>
      <div className="flex flex-row text-sm text-darkgray">
        <p>아직 회원이 아니신가요?</p>
        <Link href="/signup" className="font-semibold underline ml-1">
          회원가입
        </Link>
      </div>
    </div>
  )
}

export default Login
