import React from 'react'
import Breadcrumb from '../Breadcrumb'

//
//
//

export default async function Layout({
  entertainer,
  scouter,
}: Readonly<{
  entertainer: React.ReactNode
  scouter: React.ReactNode
}>) {
  const role = true

  return (
    <div className="box-border pt-10 md:px-10 xl:px-52">
      <Breadcrumb userRole={role} />
      {role ? entertainer : scouter}
    </div>
  )
}
