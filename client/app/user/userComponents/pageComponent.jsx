'use client'

import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'
import expert from '@/public/expert.png'
import { FaRegBell } from 'react-icons/fa'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import useUserStore from '@/app/store/useUserStore'
import Categories from './TopCategories'
import Experts from './Experts'
import { HomePageSkeleton } from './Skeleton'

const PageComponent = ({ experts }) => {
  const { user, getExpertLoading } = useUserStore();

  return (
    <div className="flex flex-col gap-3 bg-slate-100 p-5 rounded-xl mb-20">
      <div className="md:max-w-lg w-full mx-auto flex items-center justify-between fixed z-10 bg-green-100/90 top-0 left-0 right-0 p-3 ">
        <Link href='/user'>
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={40}
            priority
            className='w-auto h-auto'
          />
        </Link>

        <button className="p-2">
          <FaRegBell className='size-5 text-slate-700' />
        </button>
      </div>

      {/* navbar */}
      <div className="flex justify-between items-center text-sm font-medium mt-12">
        <p className='text-lg text-slate-600 font-semibold flex items-center gap-1 capitalize'>Welcome, {user?.full_name}</p>

        <Link href='/auth/signup?ref=provider' className="shadow-md relative transition-all border border-slate-200  px-3 py-2 rounded-md font-semibold group text-green-600 hover:bg-green-100 flex items-center">
          Join as Expert
          <ArrowRight className='size-5 -ml-5 opacity-0 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300' />
        </Link>
      </div>

      {/* Trusted box */}
      <div className="h-60 relative rounded-2xl bg-green-600 overflow-hidden">
        <div className="bg-linear-to-b from-green-400 to-green-900 z-0 w-full h-full absolute top-0 left-0"></div>

        <div className="grid grid-cols-5 gap-5 backdrop-blur-xl">
          <div className="col-span-3 flex flex-col p-5">
            <p className='text-2xl font-medium text-white'>
              Find trusted <br />
              local services <br />
              near you
            </p>

            <p className='mt-2 text-sm text-slate-100'>Quick. Easy. Reliable</p>
          </div>

          <div className="col-span-2">
            <Image
              src={expert}
              alt="expert"
              width={150}
              height={40}
              priority
              sizes="(max-width: 768px) 100vw, 300px"
              className='object-contain'
            />
          </div>
        </div>

        <Link
          href='/user/search'
          className='p-3 items-center gap-2 text-slate-600 rounded-lg flex absolute bottom-3 left-3 right-3 bg-white'
        >
          <Search className='size-4' />
          Search by name, services...
        </Link>

      </div>

      {/* Categories */}
      <Categories />

      <div className="relative flex flex-col">
        {/* Popular Experts */}
        <Experts experts={experts} quantity={10} title="Popular Experts" />

        {/* Skeleton  */}
        {
          getExpertLoading &&
          <HomePageSkeleton />
        }
      </div>
    </div>
  )
}

export default PageComponent