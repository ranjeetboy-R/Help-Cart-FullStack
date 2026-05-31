'use client'

import useUserStore from '@/app/store/useUserStore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Experts from '../../userComponents/Experts';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';

const page = () => {

  const params = useParams();
  const key = params.id;

  const { allExperts } = useUserStore();
  const [experts, setExperts] = useState([]);
  const [uiUpdate, setUiUpdate] = useState(false);

  useEffect(() => {
    const gettingExpert = async () => {
      const res = await allExperts();
      if (res?.success) {
        const experts = res.providers;

        if (key) {
          const filter = experts?.filter(expert =>
            expert.profession?.some(category =>
              category.toLowerCase().includes(key.toLowerCase())
            )
          )
          setExperts(filter);
        }
      }
    }
    gettingExpert();
  }, [])

  return (
    <div className="p-5 flex flex-col">
      <Link href='/user/categories' className='flex items-center gap-2 rounded-full'>
        <button className="rounded-full hover:bg-slate-100 transition-all p-1.5">
          <IoArrowBack className='text-slate-700 size-5' />
        </button>
        Back
      </Link>

      {
        experts.length === 0 &&
        <div className="flex flex-col items-center mt-20 mx-auto">
          <h1 className='capitalize text-2xl font-semibold'>{key}</h1>
          <p className='font-medium capitalize text-slate-700'>Oops! {key} Not Found</p>
        </div>
      }

      {
        experts.length > 0 &&
        <Experts experts={experts} setUiUpdate={setUiUpdate} uiUpdate={uiUpdate} title={`All ${key}`} />
      }
    </div>
  )
}

export default page