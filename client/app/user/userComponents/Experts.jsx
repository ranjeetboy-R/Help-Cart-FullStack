'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { HiMiniCheckBadge } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import useUserStore from '@/app/store/useUserStore';
import { Bookmark, Phone } from 'lucide-react';

const Experts = ({ experts = null, quantity, title = '', setUiUpdate, uiUpdate }) => {

    const { saveProvider, getProfile, user, allExperts } = useUserStore();
    const [saved, setsaved] = useState();
    const [totalExperts, setTotalExperts] = useState([]);

    useEffect(() => {
        const gettingExpert = async () => {
            const res = await allExperts();
            if (res?.success) {
                setTotalExperts(res.providers)
            }
        }
        gettingExpert();
    }, [])

    useEffect(() => {
        const getting = async () => {
            await getProfile();
        }
        getting();
    }, [saved])

    const saveProviderButton = async (providerId) => {
        if (providerId) {
            const res = await saveProvider(providerId);
            if (res?.success) {
                setsaved(!saved);
                setUiUpdate(!uiUpdate);
            }
        }
    }

    const finalExperts = experts ? experts : totalExperts;


    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex font-semibold items-center justify-between">
                <p className='text-sm capitalize'>{title}</p>
                <Link href="/allExperts" className='text-xs text-green-700'>View all</Link>
            </div>

            <div className="flex flex-col gap-3">
                {
                    finalExperts?.slice(0, quantity).map((expert, index) => {
                        const isSaved = user?.savedProviderIds?.includes(expert._id);

                        return (
                            <div
                                className="py-2 hover:bg-white bg-white/50 transition-all flex justify-between items-center shadow shadow-black/20 border border-slate-200 rounded-lg p-3"
                                key={index}
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <div className="h-16.5 w-20 flex items-center justify-center border border-slate-200 rounded-md">
                                        {expert.profilePic ?
                                            <img src={expert.profilePic} alt='Expert' className='w-full h-full rounded-md object-cover' />
                                            :
                                            <img src="/profileImage.webp" alt='Expert' className='w-full h-full rounded-md object-cover' />
                                        }

                                    </div>


                                    <Link href={`/user/expert/${expert._id}`} className="flex flex-col w-full gap-1">
                                        <div className='relative font-semibold text-lg w-fit capitalize'>
                                            {expert.full_name}
                                            {
                                                expert.availability &&
                                                <HiMiniCheckBadge className='fill-green-600 absolute -top-1 -right-4' />
                                            }
                                        </div>
                                        <div className='flex items-center gap-2 text-xs'>
                                            {
                                                expert.profession?.slice(0, 2).map((item, index) => (
                                                    <p key={index} className='font-medium capitalize text-slate-700'>{item} {index === 0 ? ',' : ''}</p>
                                                ))
                                            }
                                        </div>

                                        <p className='font-medium text-slate-700 text-sm'>{expert.state}</p>
                                    </Link>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button onClick={() => saveProviderButton(expert._id)} className='border border-slate-300 hover:bg-green-100 w-9 h-9 flex items-center justify-center rounded-full'>
                                        <Bookmark className={`${isSaved ? 'fill-amber-500 text-amber-500' : 'text-slate-600'} size-5`} />
                                    </button>

                                    {
                                        expert.phone &&
                                        <a href={`tel:+91${expert.phone}`} className="border border-slate-300 hover:bg-green-100 w-9 h-9 flex items-center justify-center rounded-full">
                                            <Phone className='size-4 text-slate-600' />
                                        </a>
                                    }

                                    {
                                        expert.whatsapp &&
                                        <a href={`https://wa.me/91${expert.whatsapp}`} target='_blank' className="bg-green-600 w-9 h-9 flex items-center justify-center rounded-full">
                                            <FaWhatsapp className='size-5 text-white' />
                                        </a>
                                    }
                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default Experts