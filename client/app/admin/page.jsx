'use client'

import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/useAuthStore';
import Loading from '../Loading';

const page = () => {

  const { getAllUsers, getAllExperts, getLoading, account } = useAuthStore();
  const [experts, setExperts] = useState('');
  const [users, setusers] = useState('');

  useEffect(() => {
    const get = async () => {
      const res = await getAllExperts();
      console.log("experts", res);

      if (res?.success) {
        setExperts(res.experts?.length);
      }
    }
    get();
  }, [])

  useEffect(() => {
    const get = async () => {
      const res = await getAllUsers();
      console.log("users", res);

      if (res?.success) {
        setusers(res.users?.length);
      }
    }
    get();
  }, [])

  return (
    <div className="flex flex-col">
      <h1 className='text-3xl font-semibold items-center flex gap-2'>
        Welcome, {account?.full_name}
      </h1>

      <div className="flex flex-col gap-5 mt-10">
        <div className="hover:bg-green-50 bg-slate-50 shadow-lg transition-all flex items-center justify-between border border-slate-300 rounded-2xl p-5">
          <p className='text-lg font-semibold text-slate-800'>Total Users</p>
          <p className='text-2xl font-bold'>{users || '0'}</p>
        </div>

        <div className="hover:bg-green-50 bg-slate-50 shadow-lg transition-all flex items-center justify-between border border-slate-300 rounded-2xl p-5">
          <p className='text-lg font-semibold text-slate-800'>Total Experts</p>
          <p className='text-2xl font-bold'>{experts || '0'}</p>
        </div>
      </div>

      {
        getLoading &&
        <Loading />
      }

    </div>
  )
}

export default page