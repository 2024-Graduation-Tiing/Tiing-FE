import React from 'react'
import Breadcrumb from '../Breadcrumb'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="px-52 pt-10">
      <Breadcrumb userRole={true} />
      {children}
    </div>
  )
}
