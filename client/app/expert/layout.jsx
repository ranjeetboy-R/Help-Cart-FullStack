"use client"

import { LogOut, UserLock, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { RiMenu3Fill } from 'react-icons/ri'
import { expertPageItems } from '@/public/assests';
import toast from 'react-hot-toast';
import logo from '@/public/logo.png';
import useAuthStore from '../store/useAuthStore';

const layout = ({ children }) => {
    const {getProfile, account, logoutProfile} = useAuthStore();

    const pathname = usePathname() || '/expert';
    const [phoneMenuOpen, setPhoneMenuOpen] = useState(false)
    const asideDiv = useRef();

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (asideDiv.current && !asideDiv.current.contains(e.target)) {
                setPhoneMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const logout = async () => {
        const res = await logoutProfile();
        if (res && res.success) {
            toast.success("Logout successfully")
            window.location.replace("/auth/login");
        }
    }

    return pathname !== '/expert/accountDetails' ? (
        <div className='h-screen md:max-w-lg mx-auto w-full md:flex bg-linear-to-r from-zinc-100 via-zinc-50 to-zinc-50 overflow-hidden'>

            <div className={`flex-1 p-5 mt-18 h-screen overflow-y-auto [overflow-style:none] scrollbar-none`}>
                {children}
            </div>

            {/* Mobile Menu  */}
            <aside ref={asideDiv} className={`${phoneMenuOpen ? "translate-y-0" : "-translate-y-full"
                } transition-all z-50 absolute top-0 p-5 duration-200 w-80  flex-col border border-slate-200 bg-slate-50 flex rounded-b-xl h-screen`}
            >
                <div className={`flex justify-between`}>
                    <a href='/expert' className={`relative`}>
                        <Image
                            src={logo}
                            alt="Logo"
                            width={80}
                            height={50}
                            priority
                            className={`object-contain h-auto w-auto`}
                        />
                        <div className={`absolute top-0 left-0 bg-amber-300/10 w-full h-full blur-xl`}></div>
                    </a>

                    <button
                        onClick={() => setPhoneMenuOpen(false)}
                        className={`w-8 h-8 border border-slate-600 rounded-md text-slate-700 aspect-square transition-all cursor-pointer flex justify-center items-center`}
                    >
                        <X className={`size-5`} />
                    </button>
                </div>

                <div className="flex flex-col mb-20 pb-5 h-screen overflow-y-scroll scrollbar-none">

                    <div className={`flex flex-col pb-5 mt-5`}>
                        {
                                  account?.profilePic &&
                                  <div className="w-20 h-20 rounded-full relative mx-auto">
                                    <Image src={account?.profilePic || undefined} alt='Profile' fill  sizes="80px" className='object-cover rounded-full' priority />
                                  </div>
                                }

                        <h1 className={`text-slate-700 mt-3 text-2xl justify-center flex capitalize font-semibold items-center gap-2`}>{account?.full_name}
                        </h1>

                        <p className='text-center mt-1 text-zinc-500'>Email Id : {account?.email}</p>
                    </div>

                    <div className={`flex flex-col gap-2`}>
                        {expertPageItems.map((item, index) => (
                            <Link
                                onClick={() => setPhoneMenuOpen(false)}
                                href={item.href}
                                key={index}
                                className={`
                                    rounded-r-md border-l-4 pl-2 flex gap-2 py-1.5 transition-all duration-200
                                    ${pathname === item.href
                                        ?
                                        `border-green-600 bg-green-100 text-green-800 scale-y-105`
                                        : "border-transparent text-slate-600"
                                    } 
                                    ${phoneMenuOpen ? "items-center hover:bg-green-100"
                                        :
                                        "justify-center bg-transparent"} 
                                         `}
                            >
                                <item.icon className='size-4' />
                                <h1 className={`font-medium`}>{item.title}</h1>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className={`flex items-center justify-center absolute bottom-5 left-0 w-full`}>
                    <div className={`text-slate-700 hover:bg-slate-100 border border-zinc-300 w-full px-3 mx-3 rounded-xl flex items-center justify-between py-3`}>
                        <div className="flex items-center gap-2">
                            <UserLock className={` size-5`} />
                            <p>{account?.email}</p>
                        </div>
                        <button onClick={logout} className="cursor-pointer">
                            <LogOut className='size-5' />
                        </button>
                    </div>
                </div>
            </aside>

            <nav className="shadow-md md:max-w-lg mx-auto shadow-zinc-600/10 backdrop-blur-xl bg-white fixed top-0  w-full flex justify-between items-center p-5">
                <a href='/expert' className={`relative`}>
                    <Image
                        src={logo}
                        alt="Logo"
                        width={80}
                        height={40}
                        priority
                        className={`object-contain w-auto`}
                    />
                    <div className={`absolute top-0 left-0 bg-amber-300/10 w-full h-full blur-xl`}></div>
                </a>

                <button
                    onClick={() => setPhoneMenuOpen(true)}
                    className={`w-8 h-8 border border-slate-300 rounded-md text-slate-700 aspect-square transition-all cursor-pointer flex justify-center items-center`}
                >
                    <RiMenu3Fill className={`size-4`} />
                </button>
            </nav>
            {
                phoneMenuOpen &&
                <div className="fixed top-0 left-0 bg-black/60 w-full h-full"></div>
            }
        </div>
    )
        :
        (
            <div>
                {children}
            </div>
        )
}

export default layout