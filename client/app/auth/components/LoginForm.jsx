"use client";

import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/store/useUserStore";
import useAuthStore from "@/app/store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("user");
    const [userRedirect, setUserRedirect] = useState(false);
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
        if (role === "user") {
            if (formData) {
                const res = await login(formData);
                if (res?.success) {
                    router.replace('/user')
                }

            }
        }

        if (role === "provider") {
            if (formData) {
                const res = await login(formData);
                if (res?.success) {
                    router.replace('/provider')
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
        console.log(credentialResponse.credential);
        const res = await googleAuth(credentialResponse, role);
        if (res?.success) {
            console.log("account", res.account);
            if (res.account.role === 'user') {
                router.replace('/user');
            }

            if (res.account.role === 'provider') {
                router.replace('/provider');
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

    useEffect(() => {
        if (userRedirect) router.replace("/user");
    }, [userRedirect]);

    return (
        <form onSubmit={FormSubmit} className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">

            {/* Heading */}
            <div className="mb-6 text-center">
                <h1 className="text-xl font-semibold">
                    Sign in to Help Cart Application
                </h1>
                <p className="text-sm text-zinc-400">
                    Easily find and hire skilled workers.
                </p>
            </div>

            {/* Role Buttons */}
            <div className="flex gap-2 mt-5">
                <button type="button" onClick={() => { setRole("user"); setFormData(emptyForm) }} className={`${role === "user" ? 'border-zinc-500 text-white bg-zinc-800/50' : 'text-zinc-400'} border border-transparent w-full cursor-pointer py-2 rounded-lg`}>
                    Login as User
                </button>
                <button type="button" onClick={() => { setRole("admin"); setFormData(emptyForm) }} className={`${role === "admin" ? 'border-zinc-500 text-white bg-zinc-800/50' : 'text-zinc-400'} border border-transparent w-full cursor-pointer py-2 rounded-lg`}>
                    Login as Expert
                </button>
            </div>

            <div className="mt-5">
                <GoogleLogin 
                    onSuccess={LoginWithGoogle}
                    onError={()=> {
                        toast.error("Login Failed")
                    }}
                />
            </div>

            {/* Email */}
            <div className="mb-3 mt-7">
                <label className="text-sm text-zinc-600">Email id *</label>
                <div className="flex items-center mt-1 border border-slate-600 hover:border-slate-500 transition-all rounded-lg px-3">
                    <Mail size={16} className="text-zinc-500" />
                    <input
                        autoComplete="off"
                        name='email'
                        type='email'
                        value={formData?.email}
                        required
                        placeholder="Enter your email address"
                        onChange={handleInput}
                        className="w-full bg-transparent outline-none p-2 text-sm"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="mb-3">
                <label className="text-sm text-zinc-400">Password*</label>
                <div className="flex items-center mt-1 border border-slate-600 hover:border-slate-500 transition-all rounded-lg pl-3">
                    <Lock size={16} className="text-zinc-400" />
                    <input
                        autoComplete="off"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Enter password"
                        value={formData?.password}
                        onChange={handleInput}
                        className="w-full bg-transparent outline-none p-2 text-sm"
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

            <button disabled={accountLoading} className="disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-100 bg-zinc-200 text-black mt-5 py-2 rounded-lg">
                {
                    (accountLoading) &&
                    <Loader className="size-5 animate-spin" />
                }
                {
                    (accountLoading) ?
                        'Sign in...' : 'Sign in'
                }
            </button>

            <p className="text-center text-sm text-zinc-400 mt-4">
                New on our platform?
                <span onClick={() => router.push("/auth/signup")} className="ml-2 text-white cursor-pointer">
                    Create an account
                </span>
            </p>
        </form>
    );
}