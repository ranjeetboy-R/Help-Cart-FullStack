'use client'

import React, { useEffect, useState } from 'react'
import useProviderStore from '../store/useProviderStore'
import Image from 'next/image';
import { ChevronRight, MapPin } from 'lucide-react';

const page = () => {

  const { provider } = useProviderStore();

  console.log("provider", provider);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between rounded-xl bg-green-100/70 shadow-lg shadow-black/10 p-5">

        <div className="flex items-center gap-5">
          {
            provider?.profilePic &&
            <div className="w-20 h-20 rounded-full relative">
              <Image src={provider?.profilePic || undefined} fill className='object-cover' priority />
            </div>
          }

          <div className="flex flex-col">
            <p className='text-lg font-semibold capitalize'>{provider?.full_name}👋</p>

            <span className='flex items-center gap-2 mt-1'>
              {
                provider?.profession?.map((item, index) => (
                  <p className='capitalize text-sm' key={index}>{item}</p>
                ))
              }
            </span>

            <div className='capitalize text-slate-700 text-sm mt-2 flex items-center gap-2'>
              <MapPin className='size-4' />
              {provider?.village}, {provider?.state} {provider?.district}
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 border border-green-300 hover:bg-green-50 transition-all active:scale-90 px-3 py-2 text-sm rounded-lg">
          View My Profile
          <ChevronRight className='size-4' />
        </button>
      </div>
    </div>
  )
}

export default page