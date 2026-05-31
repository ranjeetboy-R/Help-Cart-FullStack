'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '@/public/logo.png'
import expert from '@/public/expert.png'
import { FaRegBell } from 'react-icons/fa'
import Link from 'next/link'
import { Search } from 'lucide-react'
import Experts from './userComponents/Experts'
import Categories from './userComponents/TopCategories'
import { CiLocationOn } from 'react-icons/ci'
import useUserStore from '../store/useUserStore'

const page = () => {
  const { allExperts, user } = useUserStore();
  const [experts, setExperts] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const gettingExpert = async () => {
      const res = await allExperts();
      if (res?.success) {
        setExperts(res.providers)
      }
    }
    gettingExpert();
  }, [])

  const filteredExperts = experts.filter(expert =>
    expert.full_name.toLowerCase().includes(searchInput) ||
    expert.profession.some(item => item.toLowerCase().includes(searchInput.toLowerCase()))
  )


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
            quality={100}
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
              quality={100}
            />
          </div>
        </div>

        <div className="rounded-lg flex absolute bottom-3 left-3 right-3 bg-white p-1.5">
          <input
            type="search"
            onChange={(e) => setSearchInput(e.target.value.toLowerCase().trim())}
            placeholder='Search for services...'
            className='p-2 w-full'
          />

          <button className="w-12 rounded-md bg-linear-to-b from-green-400 to-green-900 active:scale-90 transition-all flex items-center justify-center text-white">
            <Search className='size-5' />
          </button>
        </div>

      </div>

      {/* Categories */}
      <Categories />

      {/* Popular Experts */}
      <Experts experts={filteredExperts} quantity={10} title="Popular Experts" />
    </div>
  )
}

export default page