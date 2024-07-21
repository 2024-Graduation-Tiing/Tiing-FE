import React from 'react'
import Breadcrumb from '../Breadcrumb'

//
//
//

const checkUserRole = () => {
  return true
}

export default function Layout({
  children,
  entertainer,
  scouter,
}: Readonly<{
  children: React.ReactNode
  entertainer: React.ReactNode
  scouter: React.ReactNode
}>) {
  const role = checkUserRole()

  return (
    <div className="px-52 pt-10">
      <Breadcrumb userRole={role} />
      {children}
      {/* role based conditional route */}
      {role ? entertainer : scouter}
    </div>
  )
}
