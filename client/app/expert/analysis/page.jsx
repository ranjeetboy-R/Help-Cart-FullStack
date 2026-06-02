'use client'

import React, { useEffect, useState } from 'react'
import useProviderStore from '@/app/store/useProviderStore';
import useAuthStore from '@/app/store/useAuthStore';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const page = () => {

  const { getUserDetailsWhoSaveProvider } = useProviderStore();
  const { account } = useAuthStore();

  const [UserDetails, setUserDetails] = useState([]);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const get = async () => {
      const res = await getUserDetailsWhoSaveProvider();
      if (res?.success) {
        setUserDetails(res.users);
      }
    }
    get();
  }, [])

  const filteredUser = UserDetails?.filter(user =>
    user.state?.toLowerCase().includes(input.toLowerCase()) ||
    user.ward?.toLowerCase().includes(input.toLowerCase()) ||
    user.pincode?.toLowerCase().includes(input.toLowerCase())
  )

  console.log("filteredUser", filteredUser);


  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;

  const currentUsers = filteredUser.slice(start, start + itemsPerPage);

  return (
    <div className="flex flex-col h-screen">

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Link href="/expert" className='mb-2 flex items-center gap-3'>
            <IoArrowBack className='text-slate-800 size-5' /> All users
          </Link>
        </div>

        <input type="search" name="search" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Search for village, pincode & ward no..." className="border border-zinc-400 rounded-lg w-full p-2.5 hover:border-slate-400 transition-all
          " />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto md:scrollbar-thin scrollbar-none">
        <table className="shadow shadow-black/20 my-3 mx-1 min-w-225 w-full mt-5">
          <thead className="bg-green-600 text-white text-lg">
            <tr className="text-left whitespace-nowrap">
              <th className="pl-3 py-2 font-medium">S/N.</th>
              <th className="pl-3 py-2 font-medium">Village</th>
              <th className="pl-3 py-2 font-medium">Ward No.</th>
              <th className="pl-3 py-2 font-medium">Pincode</th>
              <th className="pl-3 py-2 font-medium">State</th>
              <th className="pl-3 py-2 font-medium">district</th>
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
                  <td className="pl-3 py-2">{user.village || "Mohjamma"}</td>
                  <td className="pl-3 py-2">{user.ward || '13'}</td>
                  <td className="pl-3 py-2">{user.pincode || '843107'}</td>
                  <td className="pl-3 py-2">{user.state}</td>
                  <td className="pl-3 py-2">{user.district}</td>
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

    </div>
  )
}

export default page