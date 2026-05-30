'use client'

import useUserStore from '@/app/store/useUserStore';
import { Bookmark, ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { CgUnavailable } from 'react-icons/cg';
import { CiLocationOn } from 'react-icons/ci';
import { FaAngleRight, FaWhatsapp } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { HiMiniCheckBadge } from 'react-icons/hi2';
import { IoIosCall } from 'react-icons/io';
import { IoArrowBack, IoShieldCheckmark } from 'react-icons/io5';
import { MdKeyboardArrowRight, MdOutlineEventAvailable, MdShare } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { SiHyperskill } from 'react-icons/si';
import { SlLike } from 'react-icons/sl';
import ExpertDetailsSkeleton from '../../userComponents/ExpertDetailsSkeleton';

const page = () => {

    const params = useParams();
    const id = params.id;
    const { getExpertById, toggleReaction, getExpertLoading } = useUserStore();

    const [expert, setExpert] = useState(null);
    const [liked, setliked] = useState(false);
    const [disliked, setdisliked] = useState(false);
    const [colleps, setColleps] = useState(null);

    useEffect(() => {
        const getProvider = async () => {
            if (id) {
                const res = await getExpertById(id);
                if (res?.success) {
                    setExpert(res.provider)
                }
            }
        }
        getProvider();
    }, [])

    const submitReaction = async (type) => {
        const reaction = { type };
        const res = await toggleReaction(expert?._id, reaction);

        if (res?.success) {
            setExpert((prev) => ({
                ...prev,
                likes: res.data.likes,
                dislikes: res.data.dislikes,
                liked: res.data.liked,
                disliked: res.data.disliked
            }))

            setliked(res.data.liked);
            setdisliked(res.data.disliked);
        }
    }

    const collepsToggle = (item) => {
        setColleps(colleps === item ? null : item)
    }

    return (
        <div className="md:max-w-md mx-auto w-full flex flex-col gap-5 p-2">

            {/* image */}
            <div className="relative rounded-t-2xl h-60">
                {
                    expert?.profilePic &&
                    <Image src={expert.profilePic} fill alt='Expert Image' className='object-cover rounded-t-2xl' />
                }

                <div className="absolute top-0 left-0 w-full h-full p-4 bg-linear-to-b from-transparent via-transparent to-white">
                    <div className="flex justify-between">
                        <Link href='/user' className='bg-black/30 h-fit p-2 rounded-full'>
                            <IoArrowBack className='text-white size-5' />
                        </Link>

                        <div className="flex gap-3">
                            <button className="flex h-fit items-center text-green-600 font-medium bg-green-200 p-2 text-xs gap-1 rounded-full">
                                <IoShieldCheckmark /> Verified
                            </button>

                            <div className="flex flex-col gap-3">
                                <Link href='/app/expert' className='bg-black/30 p-2 rounded-full'>
                                    <MdShare className='text-white size-5' />
                                </Link>
                                <Link href='/app/expert' className='bg-black/30 p-2 rounded-full'>
                                    <Bookmark className='text-white size-5' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-12 left-3 right-3 bg-white rounded-xl shadow shadow-black/20 p-3 flex flex-col">
                    {
                        expert &&
                        <div className='relative font-semibold text-lg w-fit capitalize'>
                            {expert?.full_name}
                            <HiMiniCheckBadge className='fill-green-600 absolute top-0 -right-6' />
                        </div>
                    }

                    <div className='flex items-center gap-2 text-xs'>
                        {
                            expert?.profession?.slice(0, 2).map((item, index) => (
                                <p key={index} className='font-medium text-slate-700 capitalize'>{item} {index === 0 ? ',' : ''}</p>
                            ))
                        }
                    </div>

                    {/* Availability */}
                    {
                        expert &&
                        <div className={`${expert?.availability ? 'text-green-600' : 'text-rose-600'} font-medium text-sm`} >
                            {expert?.availability ?
                                <p className='flex items-center gap-1'><MdOutlineEventAvailable /> Available</p>
                                :
                                <p className='flex items-center gap-1'><CgUnavailable /> UnAvailable</p>
                            }
                        </div>
                    }

                    <div className="w-full flex items-center mt-2 justify-between">
                        {/* Like & Deslike */}
                        {
                            expert &&
                            <div className="flex items-center gap-3 border-b border-slate-200 py-1">
                                <button onClick={() => submitReaction('like')} className="flex items-center gap-2 border-r border-slate-200 px-3">
                                    <p>{expert?.likes}</p>
                                    <span>
                                        <ThumbsUp className={`${(expert?.liked || liked) ? 'fill-rose-600 stroke-rose-600' : 'fill-transparent stroke-slate-600 stroke-2'} size-4`} />
                                    </span>
                                </button>

                                <button onClick={() => submitReaction('dislike')} className="flex items-center gap-2 pr-3">
                                    <p>{expert?.dislikes}</p>
                                    <span>
                                        <ThumbsDown className={`${(expert?.disliked || disliked) ? 'fill-gray-500 stroke-gray-500' : 'fill-transparent stroke-slate-600 stroke-2'} size-4`} />
                                    </span>
                                </button>
                            </div>
                        }

                        {/* Phone and Whatsapp */}
                        <div className="flex items-end gap-3">
                            {
                                expert?.phone &&
                                <a href={`tel:+91${expert?.phone}`} className="border border-slate-300 text-xs text-black flex items-center py-2 px-3 rounded-full gap-1">
                                    <IoIosCall className='size-4' />
                                    Call Now
                                </a>
                            }
                            {
                                expert?.whatsapp &&
                                <a href={`https://wa.me/91${expert?.whatsapp}`} target='_blank' className="bg-green-600 text-xs flex items-center py-2 px-3 text-white rounded-full gap-1">
                                    <FaWhatsapp className='size-4' />
                                    Chat on Whatsapp
                                </a>
                            }
                        </div>
                    </div>

                </div>
            </div>

            {/* Hero section */}
            <div className="flex flex-col gap-5 p-5">
                <div className="mt-8">
                    <span className='text-sm text-slate-600 font-semibold flex items-center gap-1'>
                        <CiLocationOn className='size-4' />
                        <div className="flex items-center">
                            {expert?.village}, {expert?.state} {expert?.district}
                        </div>
                    </span>
                </div>

                {
                    expert?.service_charges &&
                    <div className="flex flex-col gap-2 shadow p-2 rounded-lg border-slate-200 ">
                        <div className='font-semibold text-sm flex items-center gap-1'>
                            <RiMoneyRupeeCircleLine />
                            Service Charges
                        </div>
                        <div className="flex flex-col ">
                            {
                                expert?.service_charges?.map((charge) => (
                                    <div key={charge._id} className="flex items-center justify-between">
                                        <p className='capitalize text-sm font-semibold text-slate-800 '>{charge.title}</p>
                                        <p className='capitalize text-xs text-slate-600'>₹ {charge.amount} /-</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }


                {
                    expert?.services &&
                    <div onClick={() => collepsToggle('services')} className="grid grid-cols-12 border-b border-slate-200 pb-1 hover:translate-x-1 transition-all cursor-pointer">
                        <p className='font-semibold col-span-3'>Services</p>
                        <p className='text-sm col-span-9 w-fit text-slate-700 '>{colleps === 'services' ?
                            expert?.services
                            :
                            `${expert?.services.slice(0, 50)}...`}
                        </p>
                    </div>
                }

                {
                    expert?.bio &&
                    <div onClick={() => collepsToggle('bio')} className="grid grid-cols-12 border-b border-slate-200 pb-1 hover:translate-x-1 transition-all cursor-pointer">
                        <p className='font-semibold col-span-3'>Bio</p>
                        <p className='text-sm col-span-9 w-fit text-slate-700 '>{colleps === 'bio' ?
                            expert?.bio
                            :
                            `${expert?.bio.slice(0, 50)}...`}
                        </p>
                    </div>
                }

                {
                    expert?.description &&
                    <div onClick={() => collepsToggle('description')} className="grid grid-cols-12 border-b border-slate-200 pb-1 hover:translate-x-1 transition-all cursor-pointer">
                        <p className='font-semibold col-span-3'>Description</p>
                        <p className='text-sm col-span-9 w-fit text-slate-700 '>{colleps === 'description' ?
                            expert?.description
                            :
                            `${expert?.services.slice(0, 50)}...`}
                        </p>
                    </div>
                }

            </div>

            {
                getExpertLoading &&
                <ExpertDetailsSkeleton />
            }
        </div>
    )
}

export default page