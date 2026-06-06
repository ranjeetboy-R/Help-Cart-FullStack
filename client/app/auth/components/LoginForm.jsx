"use client";

import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("user");
    const [remember, setRemember] = useState(false);

    const { login, accountLoading, googleAuth } = useAuthStore();

    const router = useRouter();

    const emptyForm = {
        email: "",
        password: "",
        role: ""
    }

    const [formData, setFormData] = useState(emptyForm);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormData((prev) => ({ ...prev, role: role }));
    };

    const FormSubmit = async (e) => {
        e.preventDefault();

        if (formData) {
            const res = await login(formData);

            if (res?.success) {
                if (role === "user" && res?.account?.role === 'user') {
                    router.replace('/user')
                }
                if (role === "provider" && res?.account?.role === 'provider') {
                    router.replace('/expert')
                }
                if (role === "admin" && res?.account?.role === 'admin') {
                    router.replace('/admin')
                }
            }
        }
    };

    const rememberMe = (value) => {
        if (value && formData) {
            localStorage.setItem("helpCartRememberMe", JSON.stringify(formData));
            setRemember(true);
        }
        else {
            localStorage.removeItem('helpCartRememberMe');
            setRemember(false)
        }
    }

    const LoginWithGoogle = async (credentialResponse) => {
        const res = await googleAuth(credentialResponse, role);
        if (res?.success) {

            if (res.account?.role === 'user') {
                router.replace('/user');
            }

            if (res.account?.role === 'provider') {

                if (res.account.village === '' || res.account.pincode === '' || res.account.ward === '' || res.account.profession.length === 0 ) {
                    router.replace('/expert/accountDetails');
                }
                else {
                    router.replace('/expert');
                }
            }
        }
    }

    useEffect(() => {
        const data = localStorage.getItem('helpCartRememberMe');
        if (data) {
            const parseData = JSON.parse(data);
            setFormData(parseData);
            setRemember(true);
        }
    }, [remember])

    return (
        <form onSubmit={FormSubmit} className="w-full max-w-md bg-linear-to-br from-green-100 to-fuchsia-100 rounded-2xl p-6 shadow-xl shadow-black/30">

            {/* Heading */}
            <div className="mb-6 text-center">
                <h1 className="text-xl font-semibold">
                    Welcome back to HelpCart
                </h1>
                <p className="text-sm text-zinc-700">
                    Find services, save favorites, and stay connected.
                </p>
            </div>

            {/* Role Buttons */}
            <div className="flex flex-col mt-5">
                <p className="text-lg font-medium text-slate-600">Choose your account type to proceed</p>

                <div className="flex flex-wrap justify-around mt-2">

                    <button type="button" onClick={() => { setRole("user"); setFormData(emptyForm) }} className={`${role === "user" ? 'border-zinc-400 bg-green-400/10' : ''} border border-transparent px-5 cursor-pointer py-2 rounded-lg`}>
                        User
                    </button>

                    <button type="button" onClick={() => { setRole("provider"); setFormData(emptyForm) }} className={`${role === "provider" ? 'border-zinc-400 bg-green-400/10' : ''} border border-transparent px-5 cursor-pointer py-2 rounded-lg`}>
                        Expert
                    </button>

                    <button type="button" onClick={() => { setRole("admin"); setFormData(emptyForm) }} className={`${role === "admin" ? 'border-zinc-400 bg-green-400/10' : ''} border border-transparent w-fit px-5 cursor-pointer py-2 rounded-lg`}>
                        Admin
                    </button>

                </div>
            </div>

            <div className="mt-5">
                <GoogleLogin
                    onSuccess={LoginWithGoogle}
                    onError={() => {
                        toast.error("Login Failed")
                    }}
                />
            </div>

            {/* Email */}
            <div className="mb-3 mt-7">
                <label className="text-sm text-zinc-600">Email id *</label>
                <div className="flex items-center mt-1 border border-slate-400 hover:border-slate-500 transition-all rounded-lg px-3">
                    <Mail size={16} className="text-zinc-500" />
                    <input
                        autoComplete="off"
                        name='email'
                        type='email'
                        value={formData?.email}
                        required
                        placeholder="Enter your email address"
                        onChange={handleInput}
                        className="w-full p-2 text-sm"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="mb-3">
                <label className="text-sm text-zinc-400">Password*</label>
                <div className="flex items-center mt-1 border border-slate-400 hover:border-slate-500 transition-all rounded-lg px-3">
                    <Lock size={16} className="text-zinc-400" />
                    <input
                        autoComplete="off"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Enter password"
                        value={formData?.password}
                        onChange={handleInput}
                        className="w-full p-2 text-sm"
                    />
                    <button type="button" className="p-2" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>

            {/* Remember */}
            <div className="flex justify-between text-sm mb-4">
                <label className="flex select-none items-center gap-2 text-mist-600 cursor-pointer">
                    <input onChange={(e) => rememberMe(e.target.checked)} checked={remember} type="checkbox" /> Remember Me
                </label>
                <button type="button" className="text-cyan-700">Forgot Password?</button>
            </div>

            <button disabled={accountLoading} className="disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 cursor-pointer bg-linear-to-br from-green-500 to-green-700 active:scale-90 transition-all bg-zinc-200 text-white py-2 rounded-lg mt-5">
                {
                    (accountLoading) &&
                    <Loader className="size-5 animate-spin" />
                }
                {
                    (accountLoading) ?
                        'Sign in...' : 'Sign in'
                }
            </button>

            <p className="text-center text-sm text-zinc-800 mt-4">
                New on our platform?
                <span onClick={() => router.push("/auth/signup")} className="ml-2 text-green-700 font-semibold cursor-pointer">
                    Create an account
                </span>
            </p>
        </form>
    );
}