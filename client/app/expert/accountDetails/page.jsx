'use client'

import useAuthStore from '@/app/store/useAuthStore'
import React, { useEffect, useState } from 'react'
import Address from '../expertComponent/Address';
import Profile from '../expertComponent/Profile';

const AccountDetails = () => {
  const { provider, getProfile } = useAuthStore();

  const [back, setBack] = useState(false);
  const [next, setNext] = useState(false);
  const { account } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [])

  const addressComplate = (
    provider?.village &&
    provider?.pincode &&
    provider?.phone &&
    provider?.ward &&
    provider?.profession.length > 0
  )

  useEffect(() => {
    if (addressComplate) {
      setNext(true)
      setBack(false)
    }
  }, [addressComplate])


  return (
    <div className="flex justify-center items-center w-full min-h-screen p-5">
      <div className="flex flex-col h-fit md:max-w-lg w-full rounded-2xl border border-slate-200 shadow-lg shadow-black/30 p-5">
        <h1 className='text-2xl text-green-700 capitalize font-semibold'>Welcome, {account?.full_name || 'Ranjeet kumar'} </h1>
        <p className='text-sm mt-1 text-slate-700'>Complete the information below to create and access your account.</p>

        {/* Address form  */}
        <div className="overflow-hidden">
          <div className={`${next && !back ? 'hidden' : 'block'}`}>
            <Address setNext={setNext} setBack={setBack} />
          </div>
        </div>

        {/* Profile form  */}
        <div className="overflow-hidden">
          <div className={`${next && !back ? 'block' : 'hidden'}`}>
            <Profile setBack={setBack} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default AccountDetails