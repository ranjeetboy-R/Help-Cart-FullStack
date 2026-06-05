'use client'

import React, { useEffect, useState } from 'react'
import SelectProfession from './SelectProfession'
import { ArrowRight, Loader2 } from 'lucide-react'
import useProviderStore from '@/app/store/useProviderStore'
import useAuthStore from '@/app/store/useAuthStore'

const Address = ({ setNext, setBack }) => {
    const { updateProviderProfile, profileUpdateLoading } = useProviderStore();
    const { account, getProfile } = useAuthStore();

    const [formData, setFormData] = useState({
        village: '',
        pincode: '',
        phone: '',
        ward: '',
        profession: []
    })

    useEffect(() => {
        getProfile();
    }, [])

    const [profession, setProfession] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        setFormData({
            village: account?.village || '',
            pincode: account?.pincode || '',
            phone: account?.phone || '',
            ward: account?.ward || ''
        })
    }, [account])

    useEffect(() => {
        if (account?.profession) {
            setProfession(account.profession)
        }
    }, [account?.profession])

    const saveAndNext = async (e) => {
        e.preventDefault();

        const newFormData = new FormData();

        if (formData?.village) newFormData.append('village', formData.village);
        if (formData?.pincode) newFormData.append('pincode', formData.pincode);
        if (formData?.phone) newFormData.append('phone', formData.phone);
        if (formData?.ward) newFormData.append('ward', formData.ward);
        if (profession.length > 0) newFormData.append('profession', JSON.stringify(profession));

        const res = await updateProviderProfile(newFormData);
        if (res?.success) {
            setNext(true);
            setBack(false);
        }
        else {
            setNext(false);
            setBack(false);
        }
    }

    const arrayData = [
        {
            label: 'Village',
            placeholder: 'Enter your village',
            name: 'village',
            type: 'text',
            value: formData.village
        },
        {
            label: 'Pincode',
            placeholder: 'Enter your pincode',
            name: 'pincode',
            type: 'number',
            value: formData.pincode
        },
        {
            label: 'Phone',
            placeholder: 'Enter your phone',
            name: 'phone',
            type: 'number',
            value: formData.phone
        },
        {
            label: 'Ward no.',
            placeholder: 'Enter your ward',
            name: 'ward',
            type: 'number',
            value: formData.ward
        }
    ]

    return (
        <div className={`flex flex-col`}>
            <h1 className='text-lg font-semibold mt-2 text-slate-600'>Personal Details</h1>
            <form onSubmit={saveAndNext} className="flex flex-col mt-2">
                {
                    arrayData?.map((data, index) => (
                        <div key={index} className="mb-3">
                            <label className="text-sm text-slate-700 font-semibold">{data.label}*</label>
                            <input
                                onChange={(e) => handleChange(e)}
                                type={data.type}
                                required
                                value={data.value}
                                autoComplete="off" placeholder={data.placeholder}
                                name={data.name} className="w-full py-2 px-3 text-sm capitalize border border-slate-400 mt-1 rounded-md" />
                        </div>
                    ))
                }

                {/* Select profession  */}
                <div className="flex flex-col mt-1 gap-2">
                    <label className="text-sm text-slate-700 font-semibold">Select Profession*</label>
                    <SelectProfession setProfession={setProfession} profession={profession} />
                </div>

                <div className="flex justify-end mt-5">
                    <button disabled={profileUpdateLoading} className="disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2 border border-slate-300 rounded-md px-5 py-3 hover:bg-green-100 font-semibold text-sm transition-all w-fit">
                        {profileUpdateLoading && <Loader2 className='animate-spin text-slate-700 size-5' />}
                        Save & Next
                        <ArrowRight className='size-5 text-slate-700' />
                    </button>
                </div>


            </form>
        </div>
    )
}

export default Address