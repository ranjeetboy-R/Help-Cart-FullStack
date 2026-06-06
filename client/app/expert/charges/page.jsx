'use client'

import useAuthStore from '@/app/store/useAuthStore'
import { Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ServiceChargesModal from '../expertComponent/ServiceChargeModal';
import useProviderStore from '@/app/store/useProviderStore';
import { Modal } from 'antd';

const page = () => {
    const { deleteServiceCharge } = useProviderStore();
    const { getProfile, account } = useAuthStore();
    const [addModal, setAddModal] = useState(false);
    const [uiUpdate, setUiUpdate] = useState(false);

    useEffect(() => {
        getProfile();
    }, [uiUpdate])

    const ServiceChargeDeleteButton = (id) => {
        Modal.confirm({
            title: "Delete Service",
            content: "Are you sure you want to delete this service?",
            okText: "Delete",
            cancelText: "Cancel",
            onOk: async () => {
                if (id) {
                    const res = await deleteServiceCharge(id);
                    if (res?.success) {
                        setUiUpdate(!uiUpdate);
                    }
                }
            }
        })
    }

    return (
        <div className="flex flex-col">

            <div className="flex items-center justify-between">
                <h1 className='text-xl font-semibold text-slate-800'>Add Service Charges</h1>

                <button onClick={() => setAddModal(true)} className="px-5 py-2 cursor-pointer hover:bg-black bg-black/80 rounded-lg text-sm text-white active:scale-90 transition-all flex items-center gap-2">
                    <Plus /> Add new
                </button>
            </div>

            {/* Preview service charges  */}
            <div className="flex flex-col gap-3 mt-10 mb-20">
                {
                    account?.service_charges?.length > 0 &&
                    account?.service_charges?.map((data, index) => (
                        <div key={index} className="flex items-center justify-between border border-slate-200 p-5 rounded-lg shadow bg-slate-100">
                            <div className="flex flex-col">
                                <p className='capitalize text-lg font-semibold'>{data.title}</p>

                                <p className='font-medium'>₹ {data.amount} /-</p>
                            </div>

                            <button onClick={() => ServiceChargeDeleteButton(data._id)} className="p-2 cursor-pointer w-fit hover:bg-black/10 border border-slate-400 rounded-lg text-sm active:scale-90 transition-all flex items-center gap-2">
                                <Trash className='size-4' />
                            </button>


                        </div>
                    ))
                }
            </div>

            {/* Add Service Charges model  */}
            <ServiceChargesModal service_charges={account?.service_charges} setAddModal={setAddModal} addModal={addModal} setUiUpdate={setUiUpdate} uiUpdate={uiUpdate} />

        </div>
    )
}

export default page