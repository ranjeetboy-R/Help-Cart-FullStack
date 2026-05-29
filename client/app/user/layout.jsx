'use client'

import { userMenu } from '@/public/assests'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const layout = ({ children }) => {

  const pathname = usePathname();


  return (
    <div className="md:max-w-md w-full mx-auto flex flex-col justify-between bg-slate-200 h-screen">
      <div className="p-5">
        {children}
      </div>
      <div className="bg-slate-50 mx-auto w-full grid grid-cols-5 gap-3 p-5">
        {
          userMenu?.map((menu, index) => (
            <Link href={menu.href} className={`${menu.href === pathname ? 'text-green-600 font-semibold scale-105' : 'text-slate-500'} flex flex-col justify-center items-center transition-all`} key={index}>

              <menu.icon className={`${menu.href === pathname ? 'border-green-800' : ''} size-5`} />

              <p className='text-xs mt-1'>{menu.text}</p>

            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default layout