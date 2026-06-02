'use client';

import { useEffect, useState } from 'react';
import {
    User,
    Phone,
    MapPin,
    Briefcase,
    MessageCircle,
    Camera,
    FileText,
    Loader2,
} from 'lucide-react';
import { FaFacebook } from 'react-icons/fa6';
import { BsInstagram } from 'react-icons/bs';
import useAuthStore from '@/app/store/useAuthStore';
import useProviderStore from '@/app/store/useProviderStore';
import SelectProfession from '../expertComponent/SelectProfession';
import profileImage from '@/public/profileImage.webp';
import Image from 'next/image';

const fields = [
    {
        label: 'Full Name',
        name: 'full_name',
        icon: User,
        placeholder: 'Enter your full name'
    },
    {
        label: 'Phone Number',
        name: 'phone',
        icon: Phone,
        placeholder: 'Enter phone number'
    },
    {
        label: 'Village',
        name: 'village',
        icon: MapPin,
        placeholder: 'Enter village name'
    },
    {
        label: 'Ward No.',
        name: 'ward',
        icon: MapPin,
        placeholder: 'Enter ward number'
    },
    {
        label: 'Pincode',
        name: 'pincode',
        icon: MapPin,
        placeholder: 'Enter pincode'
    },
    {
        label: 'Services',
        name: 'services',
        icon: Briefcase,
        placeholder: 'e.g. House Wiring, Plumbing'
    },
    {
        label: 'WhatsApp',
        name: 'whatsapp',
        icon: MessageCircle,
        placeholder: 'WhatsApp number'
    },
    {
        label: 'Facebook',
        name: 'facebook',
        icon: FaFacebook,
        placeholder: 'Facebook profile link'
    },
    {
        label: 'Instagram',
        name: 'instagram',
        icon: BsInstagram,
        placeholder: 'Instagram profile link'
    }
];

export default function ProviderProfilePage() {
    const { account, getProfile } = useAuthStore();
    const [imagePreview, setImagePreview] = useState(null);
    const [profession, setProfession] = useState([]);

    const { updateProviderProfile, profileUpdateLoading } = useProviderStore();

    useEffect(() => {
        getProfile();
    }, [])

    const emptyForm = {
        full_name: '',
        profilePic: null,
        village: '',
        pincode: '',
        phone: '',
        ward: '',
        profession: [],
        services: '',
        whatsapp: '',
        facebook: '',
        instagram: '',
        bio: '',
        description: '',
        availability: true,
        recent_works: [],
    }

    const [ditectFormData, setDitectFormData] = useState(emptyForm);

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (!account) return;

        const filledForm = {
            profilePic: account?.profilePic || null,
            full_name: account?.full_name || '',
            village: account?.village || '',
            pincode: account?.pincode || '',
            phone: account?.phone || '',
            ward: account?.ward || '',
            services: account?.services || '',
            whatsapp: account?.whatsapp || '',
            facebook: account?.facebook || '',
            instagram: account?.instagram || '',
            bio: account?.bio || '',
            description: account?.description || '',
            availability: account?.availability ?? true,
            likes: account?.likes || 0,
            dislikes: account?.dislikes || 0,
            recent_works: account?.recent_works || [],
        }

        setFormData(filledForm);
        setDitectFormData(filledForm);
    }, [account]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files?.[0];

        setFormData(prev => ({
            ...prev, profilePic: file
        }))

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newFormData = new FormData();

        if (formData?.profilePic && formData?.profilePic !== account?.profilePic) newFormData.append("profilePic", formData.profilePic)

        if (formData?.full_name) newFormData.append("full_name", formData.full_name);
        if (formData?.village) newFormData.append("village", formData.village);
        if (formData?.pincode) newFormData.append("pincode", formData.pincode);
        if (formData?.phone) newFormData.append("phone", formData.phone);
        if (formData?.ward) newFormData.append("ward", formData.ward);
        if (formData?.services) newFormData.append("services", formData.services);
        if (formData?.whatsapp) newFormData.append("whatsapp", formData.whatsapp);
        if (formData?.facebook) newFormData.append("facebook", formData.facebook);
        if (formData?.instagram) newFormData.append("instagram", formData.instagram);
        if (formData?.bio) newFormData.append("bio", formData.bio);
        if (formData?.description) newFormData.append("description", formData.description);
        if (formData?.availability !== undefined) newFormData.append("availability", formData.availability);

        if (profession?.length > 0) newFormData.append("profession", JSON.stringify(profession));


        if (formData) {
            await updateProviderProfile(newFormData);
        }
    };

    useEffect(() => {
        if (account?.profession.length > 0) {
            setProfession(account.profession)
        }
    }, [account?.profession.length])

    const isChanges = (
        JSON.stringify(formData) !== JSON.stringify(ditectFormData)
    )

    console.log("account", account);
    console.log("formdata", formData);

    return (
        <div className="min-h-screen bg-slate-100 mb-20">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Profile Card */}
                <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-200">
                    <div className="flex flex-col items-center">

                        <div className="relative">
                            <div className="relative w-40 h-40 border-4 border-white shadow-lg shadow-black/30 rounded-full overflow-hidden">
                                <Image
                                    src={imagePreview ? imagePreview || profileImage : account?.profilePic}
                                    fill
                                    alt="Profile"
                                    className="object-cover rounded-full"
                                />
                            </div>

                            <label className="absolute bottom-1 right-1 bg-slate-900 text-white p-2.5 rounded-full cursor-pointer hover:scale-110 transition">
                                <Camera size={18} />
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleImage}
                                />
                            </label>
                        </div>

                        <h1 className="text-3xl font-bold text-slate-800 mt-5 capitalize">
                            {formData?.full_name} Profile
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Update your profile details and services
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl p-5 shadow-md border border-slate-200"
                >
                    <h2 className="text-xl font-semibold text-slate-800 mb-3">
                        Personal Information
                    </h2>

                    <div className="flex flex-col gap-5">

                        {fields.map((field) => {
                            const Icon = field.icon;

                            return (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        {field.label}
                                    </label>

                                    <div className="relative">
                                        <Icon
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className={`
                                                ${field.name === 'facebook' || field.name === 'instagram' ? '' : 'capitalize'}
                                                     w-full
                                                pl-11
                                                pr-4
                                                py-2.5
                                                rounded-md
                                                border
                                                border-slate-200
                                                bg-slate-50
                                                hover:border-slate-400
                                                focus:bg-white
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-slate-300
                                                transition`}

                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Select profession  */}
                    <div className="flex flex-col mt-5 gap-2">
                        <label className="text-sm text-slate-700 font-semibold">Select Profession*</label>
                        <SelectProfession setProfession={setProfession} profession={profession} />
                    </div>


                    {/* Bio */}
                    <div className="mt-5">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                            <FileText size={18} />
                            Bio
                        </label>

                        <textarea
                            rows={3}
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Write a short bio about yourself..."
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-4
                                hover:border-slate-400
                                focus:bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-slate-300
                                transition
                            "
                        />
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                            <FileText size={18} />
                            Description
                        </label>

                        <textarea
                            rows={6}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your experience, skills and services..."
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-4
                                hover:border-slate-400
                                focus:bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-slate-300
                                transition
                            "
                        />
                    </div>

                    {/* Availability */}
                    <div className="mt-5 flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="availability"
                            checked={formData.availability}
                            onChange={handleChange}
                            className="h-5 w-5"
                        />

                        <span className="font-medium text-slate-700">
                            Available For Work
                        </span>
                    </div>

                    {/* Button */}
                    <button
                        disabled={profileUpdateLoading || !isChanges}
                        type="submit"
                        className="
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                            w-full
                            mt-5
                            py-4
                            rounded-2xl
                            bg-slate-900
                            text-white
                            font-semibold
                            shadow-md
                            hover:shadow-xl
                            hover:scale-95
                            transition-all
                            flex items-center justify-center gap-2
                        "
                    >
                        {
                            profileUpdateLoading &&
                            <Loader2 className='animate-spin size-5'/>
                        }
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
}