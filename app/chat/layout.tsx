import './layout-style.css'

export default function ChatRouteLayout({
  children,
  postponed,
  chats,
}: {
  children: React.ReactNode
  postponed: React.ReactNode
  chats: React.ReactNode
}) {
  return (
    <div className="grid flex-1 grid-cols-4">
      <div className="col-span-1 bg-white py-4">
        {postponed}
        {chats}
      </div>
      <div className="col-start-2 col-end-5">{children}</div>
    </div>
  )
}
