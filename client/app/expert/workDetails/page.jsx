'use client'

import useAuthStore from '@/app/store/useAuthStore'
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ResentWorkModal from '../expertComponent/ResentWorkModal';
import ImagePreview from '../expertComponent/ImagePreview';
import useProviderStore from '@/app/store/useProviderStore';

const page = () => {

    const {getProfile, account} = useAuthStore();
    const [addModal, setAddModal] = useState(false);
    const [uiUpdate, setUiUpdate] = useState(false);
    const { deleteImage } = useProviderStore()

    useEffect(()=> {
        getProfile();
    }, [uiUpdate])    

  return (
    <div className="flex flex-col">

        <div className="flex flex-col gap-5">
            {
                account?.recent_works.length > 0 &&
                <div className="flex items-center justify-between">
                <h1 className='text-xl font-semibold text-slate-800'>Add Recent Work</h1>

                <button onClick={()=> setAddModal(true)} className="px-5 py-2 cursor-pointer hover:bg-black bg-black/80 rounded-lg text-sm text-white active:scale-90 transition-all flex items-center gap-2">
                    <Plus /> Add new
                </button>
            </div>
            }

            {/* Image preview  */}
            <div>
                <ImagePreview deleteImage={deleteImage} images={account?.recent_works} setUiUpdate={setUiUpdate} uiUpdate={uiUpdate} />
            </div>


        </div>

        {/* Add recent work model  */}
        <ResentWorkModal addModal={addModal} setAddModal={setAddModal} account={account} setUiUpdate={setUiUpdate} uiUpdate={uiUpdate}/>

        {
            account?.recent_works.length === 0 &&
            <div className="flex flex-col items-center rounded-2xl p-8 shadow-md shadow-black/30 bg-green-50">
                <h1 className='text-2xl font-semibold text-slate-800'>Add Recent Work</h1>
                <p className='text-sm text-center mt-2'>Add photos and details of your recently completed work to highlight your skills and experience.</p>

                <button onClick={()=> setAddModal(true)} className="mt-5 px-5 py-2 cursor-pointer hover:bg-black bg-black/80 rounded-lg text-sm text-white active:scale-90 transition-all flex items-center gap-2">
                    <Plus /> Add new
                </button>
            </div>
        }
    </div>
  )
}

export default page