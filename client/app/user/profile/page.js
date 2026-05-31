"use client"

import { UserX } from 'lucide-react';
import React, { useState } from 'react';
import Loading from '@/app/Loading';
import useUserStore from '@/app/store/useUserStore';
import moment from 'moment';
import DeleteAccount from '../userComponents/DeleteAccount';

const page = () => {

  const { user, userLoading } = useUserStore();
  const [deleteModal, setDeleteModal] = useState(false);


  return (
    <form className='mt-5 p-5 flex flex-col max-w-3xl mx-auto w-full items-center mb-20'>
      <h1 className='text-zinc-600 md:text-xl text-left w-full'>Profile Settings</h1>

      <div className="mt-5 p-5 border border-slate-200 space-y-5 w-full shadow-lg shadow-black/10 rounded-xl">

        <div className="flex items-center justify-between whitespace-nowrap">
          <p className='text-zinc-400 text-left'>Profile Details</p>
          <p className='text-zinc-600 text-sm'>Profile Created {moment(user?.createdAt).format("DD MMM YYYY, hh:mm")} </p>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
          <div className="flex flex-col gap-1">
            <label className='text-zinc-400/80'>Full Name</label>
            <input value={user?.full_name || ''} readOnly className="border border-zinc-300 capitalize hover:border-zinc-500 transition-all rounded w-full p-2 text-zinc-800" />
          </div>

          <div className="flex flex-col gap-1">
            <label className='text-zinc-400/80'>Email Id</label>
            <input value={user?.email || ''} readOnly className="cursor-not-allowed opacity-60 border border-zinc-300 hover:border-zinc-500 transition-all rounded w-full p-2 text-zinc-800" />
          </div>
        </div>

        {/* Delete account  */}
        <button type='button' onClick={() => setDeleteModal(true)} className="md:w-fit flex items-center justify-center gap-2 px-7 cursor-pointer py-3 rounded-lg border border-slate-300  hover:translate-x-1 active:scale-90 hover:bg-rose-100 duration-200 hover:border-l-4 hover:border-b-4 text-slate-800">
          <UserX className='size-4' />
          Delete account
        </button>
      </div>

      {
        userLoading &&
        <Loading />
      }

      <DeleteAccount deleteModal={deleteModal} setDeleteModal={setDeleteModal} userId={user?._id} />
    </form>
  )
}

export default page