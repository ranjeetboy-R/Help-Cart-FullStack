'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { HiMiniCheckBadge } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import useUserStore from '@/app/store/useUserStore';
import { Bookmark, Phone } from 'lucide-react';

const Experts = ({ experts = null, quantity, title = '', setUiUpdate = false, uiUpdate }) => {

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
        <div className="relative flex flex-col gap-2 mt-2">
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
                                className="py-2 hover:bg-white bg-white/50 transition-all flex justify-between items-center shadow shadow-black/20 border border-slate-200 rounded-lg p-2"
                                key={index}
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <div className="w-40 border border-slate-200 rounded-md">
                                            <img src={expert.profilePic || '/profileImage.webp'} alt='Expert' className='rounded-md object-cover aspect-square' />
                                    </div>

                                    <Link href={`/user/expert/${expert._id}`} className="flex flex-col w-full gap-1">
                                        <div className='relative font-semibold text-lg w-fit capitalize'>
                                            {expert.full_name}
                                            {
                                                expert.availability &&
                                                <HiMiniCheckBadge className='fill-green-600 absolute -top-1 -right-4' />
                                            }
                                        </div>
                                        <div className='flex flex-wrap text-xs space-x-2'>
                                            {
                                                expert.profession?.slice(0, 2).map((item, index) => (
                                                    <p key={index} className='font-semibold capitalize text-[13px]  text-slate-700'>{item}</p>
                                                ))
                                            }
                                        </div>

                                        <p className='font-medium text-slate-700 capitalize text-sm'>{expert.village}, {expert.state} {expert.district}</p>
                                    </Link>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button onClick={() => saveProviderButton(expert._id)} className='border border-slate-300 hover:bg-green-100 w-8 h-8 flex items-center justify-center rounded-full'>
                                        <Bookmark className={`${isSaved ? 'fill-amber-500 text-amber-500' : 'text-slate-600'} size-4`} />
                                    </button>

                                    {
                                        expert.phone &&
                                        <a href={`tel:+91${expert.phone}`} className="border border-slate-300 hover:bg-green-100 w-8 h-8 flex items-center justify-center rounded-full">
                                            <Phone className='size-4 text-slate-600' />
                                        </a>
                                    }

                                    {
                                        expert.whatsapp &&
                                        <a href={`https://wa.me/91${expert.whatsapp}`} target='_blank' className="bg-green-600 w-8 h-8 flex items-center justify-center rounded-full">
                                            <FaWhatsapp className='size-4 text-white' />
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