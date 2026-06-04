'use client'

import React, { useEffect, useState } from 'react'
import useProviderStore from '../store/useProviderStore'
import Image from 'next/image';
import { ArrowRight, ChevronRight, Heart, MapPin, ThumbsDown, ThumbsUp } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import Link from 'next/link';

const page = () => {

  const { getUserDetailsWhoSaveProvider } = useProviderStore();
  const [UserDetails, setUserDetails] = useState([]);

  const { account, getProfile } = useAuthStore();

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    const get = async () => {
      const res = await getUserDetailsWhoSaveProvider();
      if (res?.success) {
        setUserDetails(res.users);
      }
    }

    get();
  }, [])

  return (
    <div className="flex flex-col min-h-screen mb-20">

      {/* Welcome  */}
      <div className="flex flex-col rounded-2xl bg-green-100/90 shadow-lg shadow-black/10 p-8">

        {
          account?.profilePic &&
          <div className="relative w-40 h-40 border-4 border-white/50 shadow-lg shadow-black/50 rounded-full overflow-hidden mx-auto">
            <Image src={account?.profilePic || undefined} fill className='object-cover rounded-full' sizes='144px' alt='profile pic' priority />
          </div>
        }

        <div className="flex flex-col items-center mt-5">
          <div className='flex text-center flex-col capitalize'>
            <p className='font-semibold'>Welcome,</p>
            <p className='text-2xl font-semibold capitalize'>{account?.full_name}👋</p>
          </div>

          <span className='flex items-center gap-2 mt-1'>
            {
              account?.profession?.map((item, index) => (
                <p className='capitalize font-medium text-sm' key={index}>{item} {index < account?.profession?.length ? ',' : ''}</p>
              ))
            }
          </span>

          <div className='capitalize text-slate-700 text-sm mt-2 flex items-center gap-2'>
            <MapPin className='size-4' />
            {account?.village}, {account?.state} {account?.district}
          </div>

          <Link href="/expert/expertProfile" className="flex mt-5 items-center gap-2 border border-slate-400 bg-black/80 hover:bg-black transition-all text-white active:scale-90 px-3 py-2 text-sm rounded-lg">
            View My Profile
            <ChevronRight className='size-4' />
          </Link>
        </div>

      </div>

      {/* Analysis */}
      <div className="flex flex-col gap-3 mt-5">

        {/* Saved Profile  */}
        <Link
          href='/expert/analysis'
          className="border border-slate-300 rounded-lg hover:translate-x-1 transition-all hover:shadow hover:bg-green-50 p-5 flex justify-between items-center ">
          <div className="flex items-center gap-5">
            <span className='p-2 rounded-md bg-green-200 text-green-700'>
              <Heart className='size-5 fill-green-300' />
            </span>

            <div className="flex  items-center gap-2">
              <p className='text-2xl font-medium text-slate-800'>{UserDetails?.length > 0 && UserDetails?.length < 10 ? `0${UserDetails?.length}` : UserDetails.length}</p>
              <p>Saved By User</p>
            </div>
          </div>

          <ArrowRight className='size-5' />
        </Link>

        {/* Liked Profile  */}
        <div className="border border-slate-300 rounded-lg hover:translate-x-1 transition-all hover:shadow hover:bg-rose-50 p-5 flex items-center gap-5">
          <span className='p-2 rounded-md bg-rose-200 text-rose-700'>
            <ThumbsUp className='size-5 fill-rose-300' />
          </span>

          <div className="flex  items-center gap-5">
            <p className='text-2xl font-medium text-slate-800'>{account?.likes > 0 && account?.likes < 10 ? `0${account?.likes}` : account?.likes}</p>
            <p>Liked By User</p>
          </div>
        </div>

        {/* Liked Profile  */}
        <div className="border border-slate-300 rounded-lg hover:translate-x-1 transition-all hover:shadow hover:bg-slate-100 p-5 flex items-center gap-5">
          <span className='p-2 rounded-md bg-slate-200 text-slate-700'>
            <ThumbsDown className='size-5 fill-slate-300' />
          </span>

          <div className="flex  items-center gap-5">
            <p className='text-2xl font-medium text-slate-800'>
              {(account?.dislikes > 0 && account?.dislikes < 10) ? `0${account?.dislikes}` : account?.dislikes}
            </p>
            <p>DisLiked By User</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page