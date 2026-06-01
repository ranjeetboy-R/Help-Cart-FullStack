import React from 'react'
import { Search } from 'lucide-react'
import Experts from '../userComponents/Experts'

const page = () => {
  return (
    <div className="flex flex-col gap-3 p-5 relative">

      {/* Search Bar */}
      <div className="flex items-center gap-2 border border-slate-100 hover:shadow-md p-3 transition-all shadow rounded-lg w-full">
        <Search className='size-5 text-slate-500' />
        <input type="search" placeholder='Search electrician...' className="w-full" />
      </div>

      {/* Filter Option */}
      <div className="flex items-center justify-center gap-5 mt-2">
        <button className="bg-green-100 px-5 text-green-800 font-medium py-2 rounded-full shadow-md text-sm">
          Near Me
        </button>
        <button className="px-5 text-slate-600 border border-slate-100 shadow-md font-medium py-2 rounded-full text-sm">
          Top Rated
        </button>
        <button className="px-5 text-slate-600 border border-slate-100 shadow-md font-medium py-2 rounded-full text-sm">
          Verified Only
        </button>
      </div>

      <hr className='border border-slate-200 mt-1' />

      {/* Popular Experts */}
      <Experts quantity={10} title="Popular Experts" />

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