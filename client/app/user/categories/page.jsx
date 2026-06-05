'use client'

import React from 'react'
import Link from 'next/link'
import { categories } from '@/public/assests'
import { GoChevronRight } from 'react-icons/go'

const page = () => {
    return (
        <div>
            <div className="flex flex-col">
                <div className="md:max-w-lg fixed z-50 top-0 w-full bg-green-600 h-16 px-5 flex items-center">
                    <p className='text-white text-lg font-semibold'>All Categories</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-3 mb-20 mt-15 bg-slate-100">
                {
                    categories.map((category, index) => (
                        <Link 
                        key={index} 
                        href={`/user/showCategory/${category.key}`} className="hover:translate-x-1 transition-all cursor-pointer flex justify-between items-center bg-white shadow p-4 rounded-xl">
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