'use client'

import useUserStore from '@/app/store/useUserStore'
import React, { useEffect, useState } from 'react'
import Experts from '../userComponents/Experts';
import { Search } from 'lucide-react';
import { categories } from '@/public/assests';
import { HomePageSkeleton } from '../userComponents/Skeleton';

const page = () => {

  const { getSaveProvider } = useUserStore();
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setfilteredProviders] = useState([]);
  const [uiUpdate, setUiUpdate] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const { getExpertLoading } = useUserStore();

  useEffect(() => {
    const get = async () => {
      const res = await getSaveProvider();

      if (res?.success) {
        setProviders(res.saveProviders);
        setfilteredProviders(res.saveProviders)
      }
    }
    get();
  }, [uiUpdate])

  // filterByCategory
  const filterByCategory = (key) => {
    const filter = providers?.filter(provider =>
      provider.profession?.some(item => item.toLowerCase().includes(key))
    )
    setfilteredProviders(filter);
  }

  useEffect(() => {
    const filter = providers?.filter(provider =>
      provider.full_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      provider.profession?.some(item => item.toLowerCase().includes(searchInput.toLowerCase()))
    );

    setfilteredProviders(filter);
  }, [searchInput, providers]);

  return (
    <div className="flex flex-col p-5 mb-20">
      <div className="flex flex-col">
        <h1 className='text-lg font-semibold'>Saved</h1>
        <p className='text-xs text-slate-700'>Your saved service providers</p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mt-5 gap-2 border border-slate-100 hover:shadow-md p-3 transition-all shadow rounded-lg w-full">
        <Search className='size-5 text-slate-500' />
        <input onChange={(e) => setSearchInput(e.target.value.trim())} type="search" placeholder='Search electrician...' className="w-full" />
      </div>

      {/* Filter Option */}
      <div className="flex cursor-grab items-center mt-3 justify-center gap-5">

        <div className="flex items-center gap-3 w-full px-2 overflow-x-auto md:scrollbar-thin scrollbar-none">
          <button onClick={() => setfilteredProviders(providers)} className="bg-green-100 px-5 text-green-800 font-medium py-2 rounded-lg shadow-md mb-3 text-sm">
            All
          </button>
          {
            categories.map((category, index) => (
              <button onClick={() => filterByCategory(category.key)} key={index} className="px-3 mb-3 whitespace-nowrap text-slate-600 border border-slate-100 shadow-md bg-slate-50 hover:bg-slate-100 font-medium py-2 rounded-lg text-sm">
                {category.title}
              </button>
            ))
          }
        </div>
      </div>


      {
        filteredProviders.length === 0 &&
        <p className='mx-auto font-medium text-lg mt-10'>No saved experts yet.</p>
      }

      <div className="relative flex flex-col">
        {/* Saved Providers */}
        {
          filteredProviders.length > 0 &&
          <Experts experts={filteredProviders} setUiUpdate={setUiUpdate} uiUpdate={uiUpdate} title={`${filteredProviders.length} saved experts`} />
        }

        {/* Skeleton  */}
        {
          getExpertLoading &&
          <HomePageSkeleton />
        }
      </div>
    </div>
  )
}

export default page