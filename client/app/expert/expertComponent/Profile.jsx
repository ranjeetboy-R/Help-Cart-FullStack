'use client'

import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Loader, Loader2 } from 'lucide-react'
import useProviderStore from '@/app/store/useProviderStore'
import { useRouter } from 'next/navigation'

const Profile = ({ setBack }) => {
    const { updateProviderProfile, profileUpdateLoading } = useProviderStore();
    const router = useRouter();
    const { provider } = useProviderStore();

    const [formData, setFormData] = useState({
        services: '',
        bio: '',
        description: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        setFormData({
            services: provider?.services || '',
            bio: provider?.bio || '',
            description: provider?.description || ''
        })
    }, [provider])    

    const saveAndNext = async (e) => {
        e.preventDefault();

        if (formData.services) {
            const res = await updateProviderProfile(formData);
            if (res?.success && res?.provider?.services) {
                router.replace('/expert')
            }
        }
    }

    const arrayData = [
        {
            label: 'Services',
            placeholder: 'Enter your services',
            name: 'services',
            type: 'text',
            value: formData.services,
            optional: false
        },
        {
            label: 'Bio',
            placeholder: 'Enter your bio',
            name: 'bio',
            type: 'text',
            value: formData.bio,
            optional: true
        },
        {
            label: 'Description',
            placeholder: 'Enter your description',
            name: 'description',
            type: 'text',
            value: formData.description,
            optional: true
        }
    ]

    return (
        <div className={`flex flex-col`}>
            <h1 className='text-lg font-semibold mt-2 text-slate-600'>Profile Details</h1>

            <form onSubmit={saveAndNext} className="flex flex-col mt-2">
                {
                    arrayData?.map((data, index) => (
                        <div key={index} className="mb-3">
                            <label className="text-sm text-slate-700 font-semibold">{data.label} {data.optional ? '(Optional)' : '*'}</label>
                            <input
                                onChange={(e) => handleChange(e)}
                                type={data.type}
                                required={!data.optional}
                                value={data.value}
                                autoComplete="off"
                                placeholder={data.placeholder}
                                name={data.name}
                                className="w-full py-2 px-3 text-sm border border-slate-400 mt-1 rounded-md"
                            />
                        </div>
                    ))
                }

                {/* Button  */}
                <div className="flex justify-end mt-5 gap-5">
                    <button
                        type='button'
                        onClick={() => setBack(true)} className="disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2 border border-slate-300 backdrop-blur-lg rounded-md px-5 py-3 hover:bg-green-100 font-semibold text-sm transition-all w-fit">
                        {profileUpdateLoading && <Loader2 className='animate-spin text-slate-700 size-5' />}
                        <ArrowLeft className='size-5 text-slate-700' />
                        Previous
                    </button>

                    <button
                        disabled={profileUpdateLoading} className="disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2 border border-slate-300 backdrop-blur-lg rounded-md px-5 py-3 bg-green-100 font-semibold text-sm transition-all w-fit">
                        {profileUpdateLoading && <Loader2 className='animate-spin text-slate-700 size-5' />}
                        Save & Next
                        <ArrowRight className='size-5 text-slate-700' />
                    </button>

                </div>

            </form>
        </div>
    )
}

export default Profile