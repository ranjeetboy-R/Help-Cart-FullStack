'use client'

import React from 'react'
import UserMenu from '../userComponents/UserMenu'
import { IoArrowBack } from 'react-icons/io5'
import Link from 'next/link'
import { categories } from '@/public/assests'
import { GoChevronRight } from 'react-icons/go'

const page = () => {
    return (
        <div>
            <div className="flex flex-col">
                <div className="fixed z-50 top-0 left-0 w-full bg-green-600 h-16 px-3 flex items-center gap-3">
                    <Link href='/user' className='p-2 rounded-full'>
                        <IoArrowBack className='text-white size-6' />
                    </Link>

                    <p className='text-white text-lg font-semibold'>Categories</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-3 mb-20 mt-15 bg-slate-100">
                {
                    categories.map((category, index) => (
                        <Link href={`/category/${category.key}`}className="hover:translate-x-1 transition-all cursor-pointer flex justify-between items-center bg-white shadow p-4 rounded-xl">
                            <div className="flex items-center gap-3" key={index}>
                                <span className={`${category.bgColor} p-2 rounded-full`}>
                                    <category.icon className={`text-white `} />
                                </span>
                                <div className="flex flex-col">
                                    <p className='font-semibold'>{category.title}</p>
                                    <p className='text-xs'>{category.services}</p>
                                </div>
                            </div>

                            <GoChevronRight className='size-6 text-slate-600' />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default page