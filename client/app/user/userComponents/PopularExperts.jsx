'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import expert from '@/public/expert.png';
import { HiMiniCheckBadge } from 'react-icons/hi2';
import { IoIosCall } from 'react-icons/io';
import { FaWhatsapp } from 'react-icons/fa';
import useUserStore from '@/app/store/useUserStore';
import { Bookmark } from 'lucide-react';

const PopularExperts = () => {

    const { allExperts, getExpertLoading } = useUserStore();
    const [experts, setExperts] = useState([]);

    useEffect(() => {
        const gettingExpert = async () => {
            const res = await allExperts();
            if (res?.success) {
                setExperts(res.providers)
            }
        }
        gettingExpert();
    }, [])

    console.log("experts", experts);


    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex font-semibold items-center justify-between">
                <p className='text-sm'>Popular Experts</p>
                <Link href="/" className='text-xs text-green-700'>View all</Link>
            </div>

            <div className="flex flex-col gap-3">
                {
                    experts?.slice(0, 4).map((expert, index) => (
                        <div
                            className="py-2 hover:bg-white bg-white/50 transition-all flex justify-between items-center shadow shadow-black/20 border border-slate-200 rounded-lg p-3"
                            key={index}
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-16.5 w-17">
                                    {expert.profilePic &&
                                        <img src={expert.profilePic} alt='Expert' className='w-full h-full bg-slate-300 rounded-md object-cover' />
                                    }
                                </div>


                                <Link href={`/user/expert/${expert._id}`} className="flex flex-col gap-1">
                                    <div className='relative font-semibold text-lg w-fit capitalize'>
                                        {expert.full_name}
                                        <HiMiniCheckBadge className='fill-green-600 absolute -top-1 -right-4' />
                                    </div>
                                    <div className='flex items-center gap-2 text-xs'>
                                        {
                                            expert.profession?.slice(0, 2).map((item, index) => (
                                                <p key={index} className='font-medium text-slate-700'>{item} {index === 0 ? ',' : ''}</p>
                                            ))
                                        }
                                    </div>

                                    <p className='font-medium text-slate-700 text-sm'>{expert.state}</p>
                                </Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link href='/app/expert' className='border border-slate-300 hover:bg-green-100 p-2 rounded-full'>
                                    <Bookmark className='text-slate-600 size-5' />
                                </Link>

                                {
                                    expert.phone &&
                                    <a href={`tel:+91${expert.phone}`} className="border border-slate-300 hover:bg-green-100 p-2 rounded-full">
                                        <IoIosCall className='size-5 text-slate-600' />
                                    </a>
                                }

                                {
                                    expert.whatsapp &&
                                    <a href={`https://wa.me/91${expert.whatsapp}`} target='_blank' className="bg-green-600 p-2 rounded-full">
                                        <FaWhatsapp className='size-5 text-white' />
                                    </a>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PopularExperts