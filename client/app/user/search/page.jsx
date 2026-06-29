'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Search } from 'lucide-react'
import Experts from '../userComponents/Experts'
import useUserStore from '@/app/store/useUserStore'
import { HomePageSkeleton } from '../userComponents/Skeleton'
import toast from 'react-hot-toast'

const page = () => {
  const { searchProvider, searchLoading, allExperts, getExpertLoading } = useUserStore();
  const [search, setSearch] = useState('');
  const [experts, setExperts] = useState([]);
  const [existingExperts, setExistingExperts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  useEffect(() => {
    if (search === '') {
      setExperts(existingExperts);
    }
  }, [search])

  const totalPages = Math.ceil(experts?.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;

  const currentExpert = experts?.slice(start, start + itemsPerPage);


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

      <div className="relative flex flex-col">
        {/* Popular Experts */}
        <Experts experts={currentExpert} title="Popular Experts" />

        {/* Skeleton  */}
        {
          getExpertLoading &&
          <HomePageSkeleton />
        }
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">

        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((p) => Math.max(p - 1, 1))
          }
          className="px-3 disabled:cursor-not-allowed disabled:opacity-50 py-1 bg-zinc-300 rounded hover:bg-zinc-300 cursor-pointer"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1
              ? "bg-zinc-800 text-white"
              : "bg-white text-black cursor-pointer"
              }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={totalPages === currentPage}
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(p + 1, totalPages)
            )
          }
          className="px-3 disabled:cursor-not-allowed disabled:opacity-50 py-1 bg-zinc-200 rounded hover:bg-zinc-300 cursor-pointer"
        >
          Next
        </button>

      </div>

      {/* Post a Request */}
      <div className={`${getExpertLoading && 'hidden'} flex items-center flex-col bg-green-100 p-5 mt-5 rounded-xl mb-20`}>
        <h1 className='font-medium text-slate-800'>Didn't find what you're looking for?</h1>
        <p className='text-sm text-center text-slate-700'>Post a request and get expert  help near you.
        </p>

        <button onClick={()=> toast.success('Comming soon!')} className="bg-green-600 cursor-pointer mt-1 px-5 py-2 rounded-lg w-fit text-white text-sm">
          Post a Request
        </button>
      </div>

    </div>
  )
}

export default page