'use client'

import { Modal } from 'antd'
import React, { useState } from 'react'
import UploadImage from './UploadImage'
import toast from 'react-hot-toast'
import useProviderStore from '@/app/store/useProviderStore'
import { Loader2 } from 'lucide-react'

const ResentWorkModal = ({ addModal, setAddModal, account, setUiUpdate, uiUpdate }) => {
    const { updateProviderProfile, profileUpdateLoading } = useProviderStore();

    const [fileList, setFileList] = useState([]);

    const handleClose = ()=> {
        setAddModal(false);
        setFileList([]);
    }

    const imageCount = (account?.recent_works?.length || 0) + (fileList?.length || 0)

    const imageSave = async () => {
        const formData = new FormData();

        if (fileList.length === 0) {
            toast.error('Image field is required');
            return;
        }

        if (fileList.length > 5 || imageCount > 5) {
            toast.error('Upload maximum 5 images');
            return;
        }

        fileList.forEach((file) => {
            formData.append("images", file.originFileObj);
        })

        const res = await updateProviderProfile(formData);
        if (res?.success) {
            setUiUpdate(!uiUpdate)
            handleClose();
        }
    }


    return (
        <div>
            <Modal mask={{closable: false}} open={addModal} onCancel={handleClose} footer={null} title="Add new recent work">

                {/* Upload Image  */}
                <div className="mt-5">
                    <UploadImage fileList={fileList} setFileList={setFileList} />
                </div>

                <p className='mt-3 text-sm font-medium text-slate-600'>Upload maximum 5 images (Size limit: 300 kb)</p>

                <button onClick={imageSave} disabled={profileUpdateLoading} className="disabled:opacity-50 disabled:cursor-not-allowed mt-5 bg-black/80 hover:bg-black px-5 py-2 rounded-lg text-white cursor-pointer flex items-center gap-2">
                    {
                        profileUpdateLoading &&
                        <Loader2 className='animate-spin size-5'/>
                    }
                    Save
                </button>
            </Modal>
        </div>
    )
}

export default ResentWorkModal