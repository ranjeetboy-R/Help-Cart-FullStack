'use client'

import { Modal } from 'antd'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useProviderStore from '@/app/store/useProviderStore'
import { Loader2, Trash2 } from 'lucide-react'

const ServiceChargesModal = ({ addModal, setAddModal, setUiUpdate, uiUpdate }) => {

    const { updateProviderProfile, profileUpdateLoading } = useProviderStore();

    const emptyData = [{
        title: '',
        amount: ''
    }]

    const [formData, setformData] = useState(emptyData);

    const handleClose = () => {
        setAddModal(false);
        setformData(emptyData);
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setformData(prev =>
            prev.map((item, i) =>
                i === index ?
                    { ...item, [name]: value } :
                    item
            )
        )
    };

    const addFields = () => {
        setformData([
            ...formData,
            { title: '', amount: '' }
        ])
    };

    const removeFields = (index) => {
        setformData(formData.filter((_, indexNumber) => indexNumber !== index)
        )

        if (formData.length === 1) {
            handleClose();
        }
    }

    const chargeSave = async (e) => {
        e.preventDefault();
        if (formData.length > 0) {
            const newFormData = new FormData();
            newFormData.append("service_charges", JSON.stringify(formData))

            const res = await updateProviderProfile(newFormData);

            if (res?.success) {
                setUiUpdate(!uiUpdate)
                handleClose();
            }
        }
        else {
            toast.error("Fields are required")
        }
    }

    return (
        <div>
            <Modal centered mask={{ closable: false }} open={addModal} onCancel={handleClose} footer={null} title="Add new recent work">

                <p className='mt-3 text-sm font-medium text-slate-600'>Add starting service charges for your services</p>

                <form onSubmit={chargeSave} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 items-end mt-5">
                        {
                            formData?.map((data, index) => (
                                <div key={index} className="w-full flex flex-col gap-3 border border-slate-100 shadow p-5 rounded-xl">
                                    <input
                                        required
                                        onChange={(e) => handleChange(e, index)}
                                        type="text"
                                        value={data.title}
                                        name="title"
                                        placeholder='Your service name'
                                        className='border border-slate-400 capitalize rounded-lg py-2 px-3 hover:border-green-600'
                                    />

                                    <div className="flex items-center gap-3">
                                        <input
                                            required
                                            onChange={(e) => handleChange(e, index)}
                                            type="number"
                                            value={data.amount}
                                            name="amount"
                                            placeholder='Service starting price in rupee..'
                                            className='border flex-1 border-slate-400 rounded-lg py-2 px-3 hover:border-green-600'
                                        />

                                        <button type='button' onClick={() => removeFields(index)} className="border border-slate-300 p-2 text-slate-600 cursor-pointer hover:bg-rose-300/40 rounded-lg">
                                            <Trash2 className='size-5' />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        <button type='button' onClick={addFields} className="w-fit border border-slate-400 px-5 py-1 rounded-lg hover:bg-black/10 cursor-pointer">New</button>
                    </div>

                    <button disabled={profileUpdateLoading} className="disabled:opacity-50 disabled:cursor-not-allowed w-fit mt-5 bg-black/80 hover:bg-black px-5 py-2 rounded-lg text-white cursor-pointer flex items-center gap-2">
                        {
                            profileUpdateLoading &&
                            <Loader2 className='animate-spin size-5' />
                        }
                        Save
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default ServiceChargesModal