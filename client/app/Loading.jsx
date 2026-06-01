import React from 'react'
import { Spin } from "antd";

const Loading = ({title=''}) => {
  return (
    <div className="w-full h-full z-50 absolute top-0 left-0 flex justify-center items-center flex-col bg-black/10 backdrop-blur">
        <Spin size='large' className='animate-pulse'/>
        {
          title && <h1 className='mt-2 text-gray-700 text-lg font-semibold'>{title}</h1>
        }
    </div>
  )
}

export default Loading