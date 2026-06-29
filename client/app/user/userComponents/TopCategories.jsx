import { categories } from '@/public/assests'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Categories = () => {
    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex font-semibold items-center justify-between">
                <p className='text-sm'>Top Categories</p>
                <Link href='/user/categories' className='text-xs text-green-700'>View all</Link>
            </div>

            <div className="relative grid grid-cols-4 gap-4">
                {
                    categories?.slice(0, 7).map((category, index) => (
                        <Link href={`/user/showCategory/${category.key}`}
                            className="py-4 active:scale-90 hover:shadow-md hover:bg-white cursor-pointer bg-linear-to-br from-green-100 to-rose-100 transition-all flex flex-col items-center shadow shadow-black/20 border border-slate-200 rounded-lg"
                            key={index}
                        >
                            <category.icon style={{}} className={`${category.color} fill-green-500 size-6`} />
                            <p className='text-sm font-semibold text-slate-800 mt-2'>{category.title}</p>
                        </Link>
                    ))
                }

                <Link href='/user/categories'
                    className="py-2 flex flex-col cursor-pointer bg-linear-to-br from-green-50 to-rose-50 transition-all items-center shadow shadow-black/30 border border-slate-200 rounded-lg">
                    <Ellipsis className='size-6' />
                    <p className='text-sm font-semibold text-slate-800 mt-2'>More</p>
                </Link>
            </div>
        </div>
    )
}

export default Categories