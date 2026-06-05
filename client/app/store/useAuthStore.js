import { create } from "zustand";
import axiosInstance from "../axiosInstance";
import axios from "axios";
import toast from "react-hot-toast";

const useAuthStore = create(
    (set) => ({
        account: null,
        accountLoading: false,
        profileUpdateLoading: false,
        accountDltLoading: false,
        getProviderLoading: false,

        signup: async (formData) => {
            try {
                set({ accountLoading: true })
                const { data } = await axios.post(`/api/auth/signup`, formData, {
                    withCredentials: true
                });

                if (data.success) {
                    toast.success(data.message)
                    set({account: data.account})
                    return { success: true, account: data.account };
                }
                return { success: false };

            } catch (error) {
                const msg = error.response?.data?.message || "Something went wrong";
                toast.error(msg);
                return { success: false };
            }
            finally {
                set({ accountLoading: false })
            }
        },

        login: async (formData) => {
            try {
                set({ accountLoading: true })

                const { data } = await axios.post(`/api/auth/login`, formData, {
                    withCredentials: true
                });                

                if (data.success) {
                    toast.success(data.message)
                    set({account: data.account})
                    return { success: true, account: data.account };
                }

                return { success: false };

            } catch (error) {                
                const msg = error.response?.data?.message || "Something went wrong";
                toast.error(msg);
                return { success: false };
            }
            finally {
                set({ accountLoading: false })
            }
        },

        googleAuth: async (credentialResponse, role) => {
            try {
                const { data } = await axiosInstance.post('/auth/google-auth',
                    {
                        token: credentialResponse.credential,
                        role
                    }
                );

                if (data?.success) {
                    toast.success(data.message);
                    set({account: data.account})
                    return { success: true, account: data.account };
                }
                return { success: false };

            } catch (error) {
                const msg = error.response?.data?.message || "Something went wrong";
                toast.error(msg);
                return { success: false };
            }
        },

        logoutProfile: async () => {
            try {
                const { data } = await axiosInstance.post('/auth/logout');

                if (data.success) {
                    set({ account: null })
                    return { success: true };
                }
                return { success: false };
            } catch (error) {
                const msg = error.response?.data?.message || "Something went wrong";
                toast.error(msg);
                return { success: false };
            }
        },

        getProfile: async () => {
            try {
                set({ accountLoading: true });
                const { data } = await axiosInstance.get('/auth/profile');

                if (data.success) {
                    set({ account: data.account });
                }

            } catch (error) {
                const msg = error.response?.data?.message || "Something went wrong";
                console.log(msg);

            }
            finally {
                set({ accountLoading: false });
            }
        },

        deleteAccount: async (password) => {
            try {
                set({ accountDltLoading: true });
                const { data } = await axiosInstance.delete('/auth/delete-account', { data: { password } });

                if (data?.success) {
                    toast.success(data.message);
                    set({ account: null })
                    return { success: true }
                }
                return { success: false };

            } catch (error) {
                const msg = error.response?.data?.message || "Something went wrong";
                toast.error(msg);
                set({ accountDltLoading: false });
                return { success: false }
            }
            finally {
                set({ accountDltLoading: false });
            }
        }

    })
)

export default useAuthStore;