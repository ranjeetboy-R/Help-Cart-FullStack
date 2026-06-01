"use client";

import { Mail, Lock, Eye, EyeOff, UserPen, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import useUserStore from "@/app/store/useUserStore";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/store/useAuthStore";

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("user");

    const router = useRouter();

    const { signup, accountLoading } = useAuthStore();

    const emptyForm = {
        full_name: "",
        email: "",
        password: "",
        role: ""
    }

    const [formData, setFormData] = useState(emptyForm);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormData((prev) => ({ ...prev, role: role }));
    };

    const FormSubmit = async (e) => {
        e.preventDefault();

        if (role === 'user') {
            if (formData) {
                const res = await signup(formData);
                if (res?.success && res?.account.role === 'user') {
                    router.replace('/user')
                }
            }

        }
        if (role === 'provider') {
            if (formData) {
                const res = await signup(formData);
                if (res?.success && res?.account.role === 'provider') {
                    router.replace('/expert/accountDetails')
                }
            }
        }
    };

    return (
        <form onSubmit={FormSubmit} className="w-full max-w-md bg-linear-to-br from-green-100 to-fuchsia-100 rounded-2xl p-6 shadow-xl shadow-black/30">

            {/* Heading */}
            <div className="mb-6 text-center">
                <h1 className="text-xl font-semibold">
                    Get Started with HelpCart
                </h1>
                <p className="text-sm text-zinc-700">
                    Find services, connect with professionals.
                </p>
            </div>

            {/* Role Buttons */}
            <div className="flex gap-2 mb-4">
                <button type="button" onClick={() => { setRole("user"); setFormData(emptyForm) }} className={`${role === "user" ? 'border-zinc-400 bg-green-400/10' : ''} border border-transparent w-full cursor-pointer py-2 rounded-lg`}>
                    Login as user
                </button>
                <button type="button" onClick={() => { setRole("provider"); setFormData(emptyForm) }} className={`${role === "provider" ? 'border-zinc-400 bg-green-400/10' : ''} border border-transparent w-full cursor-pointer py-2 rounded-lg`}>
                    Login as Expert
                </button>
            </div>

            {/* Name */}
            <div className="mb-3">
                <label className="text-sm text-zinc-800">Full Name*</label>
                <div className="flex items-center mt-1 border border-slate-400 hover:border-slate-500 transition-all rounded-lg px-3">
                    <UserPen size={16} className="text-zinc-400" />
                    <input required autoComplete="off" placeholder="Enter your full name" name="full_name" onChange={handleInput} className="w-full p-2 bg-transparent" />
                </div>
            </div>

            {/* Email */}
            <div className="mb-3">
                <label className="text-sm text-zinc-800">Email address*</label>
                <div className="flex items-center mt-1 border border-slate-400 hover:border-slate-500 transition-all rounded-lg px-3">
                    <Mail size={16} className="text-zinc-400" />
                    <input required autoComplete="off" placeholder="Enter your email address" name="email" type="email" onChange={handleInput} className="w-full p-2 bg-transparent" />
                </div>
            </div>

            {/* Password */}
            <div className="mb-3">
                <label className="text-sm text-zinc-800">Password*</label>
                <div className="flex items-center mt-1 border border-slate-400 hover:border-slate-500 transition-all rounded-lg px-3">
                    <Lock size={16} className="text-zinc-400" />
                    <input required autoComplete="off"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={handleInput}
                        placeholder="Enter password"
                        className="w-full p-2 bg-transparent"
                    />
                    <button type="button" className="p-2" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>

            <button disabled={accountLoading} className="disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 cursor-pointer bg-linear-to-br from-green-500 to-green-700 active:scale-90 transition-all bg-zinc-200 text-white py-2 rounded-lg mt-5">
                {
                    accountLoading &&
                    <Loader className="size-5 animate-spin" />
                }
                {
                    accountLoading ?
                        'Sign up...' : 'Sign up'
                }
            </button>

            <p className="text-center text-sm text-zinc-800 mt-4">
                Already have and account?
                <span onClick={() => router.push("/auth/login")} className="ml-2 cursor-pointer text-green-700 font-semibold">
                    Login now
                </span>
            </p>
        </form>
    );
}