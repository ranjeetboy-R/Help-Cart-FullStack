'use client'

import useUserStore from '@/app/store/useUserStore';
import { Bookmark, CalendarCheck, ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CgUnavailable } from 'react-icons/cg';
import { CiLocationOn } from 'react-icons/ci';
import { FaWhatsapp } from 'react-icons/fa';
import { HiMiniCheckBadge } from 'react-icons/hi2';
import { IoIosCall } from 'react-icons/io';
import { IoArrowBack, IoShieldCheckmark } from 'react-icons/io5';
import { MdOutlineEventAvailable, MdShare } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import ImagePreview from '@/app/expert/expertComponent/ImagePreview';
import { ExpertDetailsSkeleton } from '@/app/user/userComponents/Skeleton';
import moment from 'moment';

const page = () => {
    const params = useParams();
    const id = params.id;
    const { user, getProfile, getExpertById, toggleReaction, getExpertLoading, saveProvider } = useUserStore();

    const [expert, setExpert] = useState(null);
    const [liked, setliked] = useState(false);
    const [disliked, setdisliked] = useState(false);
    const [colleps, setColleps] = useState(null);
    const [previousPath, setPreviousPath] = useState(null);
    const [uiUpdate, setUiUpdate] = useState(false);

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

    useEffect(() => {
        getProfile();
    }, [uiUpdate])

    const submitReaction = async (type) => {
        const reaction = { type };
        const res = await toggleReaction(expert?._id, reaction);

        if (res?.success) {
            setExpert((prev) => ({
                ...prev,
                likes: res.data.likes,
                dislikes: res.data.dislikes,
                liked: res.data.likedBy?.includes(user?._id),
                disliked: res.data.dislikedBy?.includes(user?._id)
            }))

            setliked(res.data.liked);
            setdisliked(res.data.disliked);
        }
    }

    const saveProviderButton = async (providerId) => {
        if (providerId) {
            const res = await saveProvider(providerId);

            if (res?.success) {
                setUiUpdate(!uiUpdate);
            }
        }
    }

    const collepsToggle = (item) => {
        setColleps(colleps === item ? null : item)
    }

    useEffect(() => {
        const previousPath = sessionStorage.getItem("previousPath");
        setPreviousPath(previousPath);
    }, []);

    const rewritePath = previousPath ? previousPath : '/user';

    const isSaved = user?.savedProviderIds?.includes(expert?._id);

    return (
        <div className="md:max-w-md mx-auto w-full flex flex-col gap-5 p-2">

            {/* image */}

            {
                expert &&
                <div className="relative rounded-t-2xl h-60">
                    {
                        expert?.profilePic ?
                            <Image src={expert.profilePic} priority sizes='240px 100%' fill alt='Expert Image' className='object-cover rounded-t-2xl' />
                            :
                            <Image src='/profileImage.webp' priority sizes='240px 100%' fill alt='Expert Image' className='object-contain -mt-5' />
                    }

                    <div className="absolute top-0 left-0 w-full h-full p-4 bg-linear-to-b from-transparent via-transparent to-white">
                        <div className="flex justify-between">
                            <Link href={rewritePath} className='bg-black/30 h-fit p-2 rounded-full'>
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
                                    <button
                                        onClick={() => saveProviderButton(expert?._id)} className='bg-black/30 p-2 rounded-full cursor-pointer'>
                                        <Bookmark className={`${isSaved ? 'fill-amber-500 text-amber-200' : 'text-white'} size-5`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-20 left-3 right-3 bg-white rounded-xl shadow shadow-black/20 p-3 flex flex-col">
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
                            <div className={`${expert?.availability ? 'text-green-600' : 'text-rose-600'} mt-2 font-semibold text-sm`} >
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
                                    <button onClick={() => submitReaction('like')} className="flex items-center gap-2 border-r cursor-pointer border-slate-200 px-3">
                                        <p>{expert?.likes}</p>
                                        <span>
                                            <ThumbsUp className={`${(expert?.likedBy.includes(user?._id) || liked) ? 'fill-rose-600 stroke-rose-600' : 'fill-transparent stroke-slate-600 stroke-2'} size-4`} />
                                        </span>
                                    </button>

                                    <button onClick={() => submitReaction('dislike')} className="flex items-center cursor-pointer gap-2 pr-3">
                                        <p>{expert?.dislikes}</p>
                                        <span>
                                            <ThumbsDown className={`${(expert?.dislikedBy.includes(user?._id) || disliked) ? 'fill-gray-500 stroke-gray-500' : 'fill-transparent stroke-slate-600 stroke-2'} size-4`} />
                                        </span>
                                    </button>
                                </div>
                            }

                            {/* Phone and Whatsapp */}
                            <div className="flex items-end gap-3 pr-2">
                                {
                                    expert?.phone &&
                                    <a href={`tel:+91${expert?.phone}`} className="border border-slate-300 text-xs text-black flex items-center py-2 px-3 rounded-full gap-1">
                                        <IoIosCall className='size-5 md:size-4' />
                                        <p className='hidden md:block'>Call Now</p>
                                    </a>
                                }
                                {
                                    expert?.whatsapp &&
                                    <a href={`https://wa.me/91${expert?.whatsapp}`} target='_blank' className="bg-green-600 text-xs flex items-center py-2 px-3 text-white rounded-full gap-1">
                                        <FaWhatsapp className='size-5 md:size-4' />
                                        <p className='hidden md:block'>Chat on Whatsapp</p>
                                    </a>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            }

            {/* Hero section */}
            <div className="flex flex-col mt-14 gap-5 p-5">
                <div className="flex flex-col gap-2">
                    {
                        (expert?.village || expert?.state || expert?.district) &&
                        <span className='text-sm text-slate-600 font-semibold flex items-center gap-1'>
                            <CiLocationOn className='size-4' />
                            <div className="flex items-center">
                                {expert?.village}, {expert?.state} {expert?.district}
                            </div>
                        </span>
                    }

                    {
                        expert?.createdAt &&
                        <span className='text-sm text-slate-600 font-semibold flex items-center gap-2'>
                            <CalendarCheck className='size-3' />
                            <div className="flex items-center">
                                Join {moment(expert?.createdAt).fromNow()}
                            </div>
                        </span>
                    }
                </div>

                {
                    expert?.service_charges &&
                    <div className="flex flex-col gap-2 shadow p-2 rounded-lg border-slate-200 ">
                        <div className="flex items-center justify-between text-sm">
                            <div className='font-semibold flex items-center gap-1'>
                                <RiMoneyRupeeCircleLine />
                                Service Charges
                            </div>

                            <p>Starting Price</p>
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
                    <div onClick={() => collepsToggle('services')} className="flex flex-col border-b border-slate-200 pb-1 hover:translate-x-1 transition-all cursor-pointer">
                        <p className='font-semibold col-span-3'>Services</p>
                        <p className='text-sm text-slate-700 '>{colleps === 'services' ?
                            expert?.services
                            :
                            `${expert?.services.slice(0, 50)}...`}
                        </p>
                    </div>
                }

                {
                    expert?.bio &&
                    <div onClick={() => collepsToggle('bio')} className="flex flex-col border-b border-slate-200 pb-1 hover:translate-x-1 transition-all cursor-pointer">
                        <p className='font-semibold col-span-3'>Bio</p>
                        <p className='text-sm text-slate-700 '>{colleps === 'bio' ?
                            expert?.bio
                            :
                            `${expert?.bio.slice(0, 50)}...`}
                        </p>
                    </div>
                }

                {
                    expert?.description &&
                    <div onClick={() => collepsToggle('description')} className="flex flex-col border-b border-slate-200 pb-1 hover:translate-x-1 transition-all cursor-pointer">
                        <p className='font-semibold col-span-3'>Description</p>
                        <p className='text-sm text-slate-700 '>{colleps === 'description' ?
                            expert?.description
                            :
                            `${expert?.services.slice(0, 50)}...`}
                        </p>
                    </div>
                }

                {/* Image preview  */}
                {
                    expert?.recent_works?.length > 0 &&
                    <div className='flex flex-col'>
                        <p className='mb-3 font-semibold'>Recent work images</p>
                        <ImagePreview images={expert?.recent_works} />
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