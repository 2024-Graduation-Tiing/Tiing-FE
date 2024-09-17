import './layout-style.css';

export default function ChatRouteLayout({
  children,
  postponed,
  chats,
}: {
  children: React.ReactNode;
  postponed: React.ReactNode;
  chats: React.ReactNode;
}) {
  return (
    <div className="grid h-full grid-cols-4 overflow-hidden">
      <div className="col-span-1 flex h-full flex-col overflow-hidden bg-white py-4">
        {postponed}
        {chats}
      </div>
      {children}
    </div>
  );
}
