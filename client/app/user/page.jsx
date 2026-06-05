'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '@/public/logo.png'
import expert from '@/public/expert.png'
import { FaRegBell } from 'react-icons/fa'
import Link from 'next/link'
import Experts from './userComponents/Experts'
import Categories from './userComponents/TopCategories'
import useUserStore from '../store/useUserStore'
import { HomePageSkeleton } from './userComponents/Skeleton'
import { Search } from 'lucide-react'

const page = () => {
  const { allExperts, user, getExpertLoading } = useUserStore();
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const gettingExpert = async () => {
      const res = await allExperts();
      if (res?.success) {
        setExperts(res.providers)
      }
    }
    gettingExpert();
  }, [])

  return (
    <div className="flex flex-col gap-3 bg-slate-100 p-5 rounded-xl mb-20">
      <div className="md:max-w-lg w-full mx-auto flex items-center justify-between fixed z-10 bg-green-100/50 backdrop-blur-lg top-0 left-0 right-0 p-3 ">
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
        <p className='text-sm text-slate-600 font-semibold flex items-center gap-1 capitalize'>Welcome, {user?.full_name}</p>
        <Link href='/auth/signup' className="bg-linear-to-b from-green-500 to-green-800 p-2 rounded-md text-xs text-slate-100">Join as Expert</Link>
      </div>

      {/* Trusted box */}
      <div className="h-60 relative rounded-2xl bg-green-600 overflow-hidden">
        <div className="bg-linear-to-b from-green-400 to-green-900 z-0 w-full h-full absolute top-0 left-0"></div>

        <div className="grid grid-cols-5 gap-5 backdrop-blur-xl">
          <div className="col-span-3 flex flex-col p-5">
            <h1 className='text-2xl font-medium text-white'>
              Find trusted <br />
              local services <br />
              near you
            </h1>

            <p className='mt-2 text-sm text-slate-100'>Quick. Easy. Reliable</p>
          </div>

          <div className="col-span-2">
            <Image
              src={expert}
              alt="expert"
              width={150}
              height={40}
              priority
              className='h-auto w-auto'
            />
          </div>
        </div>

        <Link
          href='/user/search'
          className='p-3 items-center gap-2 text-slate-600 rounded-lg flex absolute bottom-3 left-3 right-3 bg-white'
        >
          <Search className='size-4'/>
          Search by name, services...
        </Link>

      </div>

      {/* Categories */}
      <Categories />

      {/* Popular Experts */}
      <Experts experts={experts} quantity={10} title="Popular Experts" />

      {/* Skeleton  */}
      {
        getExpertLoading &&
        <HomePageSkeleton />
      }
    </div>
  )
}

export default page