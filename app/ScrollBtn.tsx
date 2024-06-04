'use client'

export default function ScrollBtn() {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <img src="/home_scroll_up.svg" className="fixed bottom-10 right-12" onClick={handleScroll} />
  )
}
