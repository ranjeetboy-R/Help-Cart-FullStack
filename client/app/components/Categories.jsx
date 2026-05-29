import { categories } from '@/public/assests'
import React from 'react'

const Categories = () => {
  return (
    <div className="flex flex-col gap-2">
        <div className="flex font-semibold items-center justify-between">
            <p className='text-sm'>Top Categories</p>
            <p className='text-xs text-green-700'>View all</p>
        </div>

        <div className="grid grid-cols-4 gap-3">
            {
                categories?.slice(0, 7).map((category, index)=> (
                    <div 
                    className="py-2 flex flex-col items-center shadow shadow-black/30 border border-slate-200 rounded-lg" 
                    key={index}
                    >
                        <category.icon style={{background: category.bgColor}} className={`${category.color}`} />
                        <p className='text-sm font-medium text-slate-600'>{category.title}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories