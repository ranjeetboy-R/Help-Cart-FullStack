'use client'

import React, { useEffect, useState } from 'react'
import useUserStore from '../store/useUserStore';
import Experts from '../user/userComponents/Experts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const page = () => {
    const { allExperts } = useUserStore();
    const [experts, setExperts] = useState([]);
    const [previousPath, setPreviousPath] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {

        const gettingExpert = async () => {
            const res = await allExperts();
            if (res?.success) {
                setExperts(res.providers)
            }
        }
        gettingExpert();
    }, [])

    const totalPages = Math.ceil(experts?.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;

    const currentExpert = experts?.slice(start, start + itemsPerPage);

    useEffect(() => {
        const previousPath = sessionStorage.getItem("previousPath");
        setPreviousPath(previousPath);
    }, []);

    const rewritePath = previousPath ? previousPath : '/user';

    return (
        <div className="md:max-w-lg mx-auto w-full flex flex-col gap-5 p-5">
            <Link href={rewritePath} className='flex items-center gap-2'>
                <ArrowLeft className='size-5' />
                All Experts
            </Link>

            {/* Popular Experts */}
            <Experts experts={currentExpert} title="Find the right expert for your job." />

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