'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Search } from 'lucide-react'
import Experts from '../userComponents/Experts'
import useUserStore from '@/app/store/useUserStore'

const page = () => {
  const { searchProvider, searchLoading, allExperts } = useUserStore();
  const [search, setSearch] = useState('');
  const [experts, setExperts] = useState([]);
  const [existingExperts, setExistingExperts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const gettingExpert = async () => {
        const res = await allExperts();
        if (res?.success) {
          const data = res.providers.slice(0, 6);
          setExperts(data);
          setExistingExperts(data);
        }
      }

      gettingExpert();
    }, 500);

    return () => clearTimeout(timer);

  }, [])

  const SearchSubmit = async () => {
    if (search) {
      const res = await searchProvider(search);

      if (res?.success) {
        setExperts(res.providers);
      }
    }
  }

  const finalExperts = search === '' ? existingExperts : experts;

  return (
    <div className="flex flex-col gap-3 p-5 relative">

      {/* Search Bar */}
      <div className="flex items-center border border-slate-100 hover:shadow-md p-1 transition-all shadow rounded-lg w-full">
        <div className="flex items-center gap-2 px-3 w-full">
          <Search className='size-5 text-slate-500' />
          <input onChange={(e) => setSearch(e.target.value.trim())} type="search" placeholder='Search by name, village, services...' className="w-full" />
        </div>

        <button disabled={searchLoading} onClick={SearchSubmit} className="w-10 h-10 disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-pulse cursor-pointer aspect-square rounded-md bg-linear-to-b from-green-400 to-green-900 active:scale-90 transition-all flex items-center justify-center text-white">
          {
            searchLoading ?
              <Loader2 className='animate-spin stroke-3 stroke-white' />
              :
              <Search className='size-5' />
          }
        </button>
      </div>

      <hr className='border border-slate-100 mt-1' />

      {
        finalExperts.length === 0 &&
        <span className='flex items-center text-rose-600/50 font-semibold text-center justify-center font-mono capitalize my-5 gap-1 text-lg w-full'>Opps! 
          <p className='text-green-600'>"{search}"</p> not found
        </span>
      }

      {/* Popular Experts */}
      <Experts experts={finalExperts} title="Popular Experts" />

      {/* Post a Request */}
      <div className="flex items-center flex-col bg-green-100 p-5 rounded-xl mb-20">
        <h1 className='font-medium text-slate-800'>Didn't find what you're looking for?</h1>
        <p className='text-sm text-center text-slate-700'>Post a request and get expert  help near you.
        </p>

        <button className="bg-green-600 mt-1 px-5 py-2 rounded-lg w-fit text-white text-sm">
          Post a Request
        </button>
      </div>

    </div>
  )
}

export default page