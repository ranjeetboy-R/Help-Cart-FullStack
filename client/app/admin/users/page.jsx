'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import useAuthStore from '@/app/store/useAuthStore';
import Loading from '@/app/Loading';
import moment from 'moment';

const page = () => {

  const { getAllUsers, getLoading } = useAuthStore();

  const [expertsDetails, setExpertsDetails] = useState([]);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const get = async () => {
      const res = await getAllUsers();

      if (res?.success) {
        setExpertsDetails(res.users);
      }
    }
    get();
  }, [])

  const filteredUser = expertsDetails?.filter(user =>
    user.full_name?.toLowerCase().includes(input.toLowerCase()) ||
    user.email?.toLowerCase().includes(input.toLowerCase())
  )

  const totalPages = Math.ceil(filteredUser?.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;

  const currentUsers = filteredUser?.slice(start, start + itemsPerPage);
console.log(currentUsers);

  return (
    <div className="flex flex-col h-screen">

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Link href="/expert" className='mb-2 flex items-center gap-3'>
            <IoArrowBack className='text-slate-800 size-5' /> All users
          </Link>
        </div>

        <input type="search" name="search" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Search by full name & email..." className="border border-zinc-400 rounded-lg w-full p-2.5 hover:border-slate-400 transition-all
          " />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto scrollbar-track-transparent scrollbar-thumb-black/50">
        <table className="shadow shadow-black/20 my-3 mx-1 min-w-200 w-full mt-5">
          <thead className="bg-green-600 text-white text-lg">
            <tr className="text-left whitespace-nowrap">
              <th className="pl-3 py-2 font-medium">S/N.</th>
              <th className="pl-3 py-2 font-medium">Full Name</th>
              <th className="pl-3 py-2 font-medium">Email</th>
              <th className="pl-3 py-2 font-medium">Auth Type</th>
              <th className="pl-3 py-2 font-medium">Role</th>
              <th className="pl-3 py-2 font-medium">Created At</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="even:bg-zinc-200/70"
                >
                  <td className="pl-3 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="pl-3 py-2 capitalize">{user.full_name}</td>
                  <td className="pl-3 py-2">{user.email || '13'}</td>
                  <td className="pl-3 py-2 capitalize">{user.authType}</td>
                  <td className="pl-3 py-2 capitalize">{user.role}</td>
                  <td className="pl-3 py-2 capitalize">{moment(user.createdAt).fromNow()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="pl-5 py-5 text-zinc-400">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

      {
        getLoading &&
        <Loading />
      }

    </div>
  )
}

export default page