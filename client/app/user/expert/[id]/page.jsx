'use client'

import useUserStore from '@/app/store/useUserStore';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { FaAngleRight, FaWhatsapp } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { HiMiniCheckBadge } from 'react-icons/hi2';
import { IoIosCall } from 'react-icons/io';
import { IoArrowBack, IoShieldCheckmark } from 'react-icons/io5';
import { MdKeyboardArrowRight, MdShare } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { SiHyperskill } from 'react-icons/si';

const page = () => {

    const params = useParams();
    const id = params.id;
    const { getExpertById } = useUserStore();

    const [expert, setExpert] = useState(null);

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

    console.log("expert", expert);




    return (
        <div className="flex flex-col gap-5 p-5">
            <div className="relative rounded-t-2xl h-50">
                {
                    expert?.profilePic &&
                    <Image src={expert.profilePic} fill alt='Expert Image' className='object-cover rounded-t-2xl' />
                }

                <div className="absolute top-0 left-0 w-full h-full p-5 bg-linear-to-b from-transparent via-transparent to-white">
                    <div className="flex justify-between">
                        <Link href='/app/expert' className='bg-black/30 p-2 rounded-full'>
                            <IoArrowBack className='text-white size-6' />
                        </Link>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <button className="flex items-center text-green-600 font-medium bg-green-200 p-2 text-xs gap-1 rounded-full">
                                    <IoShieldCheckmark /> Verified
                                </button>

                                <Link href='/app/expert' className='bg-black/30 p-2 rounded-full'>
                                    <MdShare className='text-white size-6' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-12 left-3 right-3 bg-white rounded-xl shadow shadow-black/20 p-3 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className='relative font-semibold text-lg w-fit capitalize'>
                            {expert?.full_name}
                            <HiMiniCheckBadge className='fill-green-600 absolute top-0 -right-6' />
                        </div>
                        <div className='flex items-center gap-2 text-xs'>
                            {
                                expert?.profession?.slice(0, 2).map((item, index) => (
                                    <p key={index} className='font-medium text-slate-700 capitalize'>{item} {index === 0 ? ',' : ''}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {
                            expert?.phone &&
                            <a href={`tel:+91${expert?.phone}`} className="bg-green-600 p-1.5 rounded-full">
                                <IoIosCall className='size-6 text-white' />
                            </a>
                        }
                        {
                            expert?.whatsapp &&
                            <a href={`https://wa.me/91${expert?.whatsapp}`} target='_blank' className="bg-green-600 p-1.5 rounded-full">
                                <FaWhatsapp className='size-6 text-white' />
                            </a>
                        }
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <span className='text-sm text-slate-600 font-semibold flex items-center gap-1'>
                    <CiLocationOn className='size-4' />
                    <div className="flex items-center">
                        {expert?.village}, {expert?.state} {expert?.district}
                    </div>
                </span>
            </div>

            {
                expert?.service_charges &&
                <div className="flex flex-col gap-2">
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
                <div className="grid grid-cols-12">
                    <p className='font-semibold col-span-3'>Services</p>
                    <p className='text-sm col-span-8 w-fit '>{expert?.services.slice(0, 90)}</p>
                    <div className="">
                        <MdKeyboardArrowRight className='size-6 col-span-1 text-slate-600 font-light' />
                    </div>
                </div>
            }

            {
                expert?.bio &&
                <div className="grid grid-cols-12">
                    <p className='font-semibold col-span-3'>Bio</p>
                    <p className='text-sm col-span-8 w-fit '>{expert?.bio.slice(0, 90)}</p>
                    <div className="">
                        <MdKeyboardArrowRight className='size-6 col-span-1 text-slate-600 font-light' />
                    </div>
                </div>
            }

        </div>
    )
}

export default page