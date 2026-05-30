'use client'

import { userMenu } from '@/public/assests'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const UserMenu = () => {

  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-50 mx-auto w-full grid grid-cols-5 gap-3 p-5">
      {
        userMenu?.map((menu, index) => (
          <Link href={menu.href} className={`${menu.href === pathname ? 'text-green-600 font-semibold' : 'text-slate-500'} hover:text-green-600 flex flex-col justify-center items-center transition-all`} key={index}>
            <menu.icon className={`${menu.href === pathname ? 'border-green-800' : ''} size-5`} />
            <p className='text-xs mt-1'>{menu.text}</p>
          </Link>
        ))
      }
    </div>
  )
}

export default UserMenu