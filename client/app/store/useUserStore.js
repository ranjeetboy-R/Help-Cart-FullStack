import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";
import axiosInstance from "../axiosInstance";

const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            userLoading: false,
            profileUpdateLoading: false,
            accountDltLoading: false,
            getExpertLoading: false,

            userSignup: async (formData) => {
                try {
                    set({ userLoading: true })
                    const { data } = await axios.post(`/api/user/signup`, formData, {
                        withCredentials: true
                    });
                    set({ user: data });

                    if (data.success) {
                        toast.success(data.message)
                        return { success: true };
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    toast.error(msg);
                    return { success: false };
                }
                finally {
                    set({ userLoading: false })
                }
            },

            userLogin: async (formData) => {
                try {
                    set({ userLoading: true })

                    const { data } = await axios.post(`/api/user/login`, formData, {
                        withCredentials: true
                    });
                    set({ user: data, userLoading: false });

                    if (data.success) {
                        toast.success(data.message)
                        return { success: true };
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    toast.error(msg);
                    return { success: false };
                }
                finally {
                    set({ userLoading: false })
                }
            },

            logoutUser: async () => {
                try {
                    const { data } = await axiosInstance.post('/user/logout');

                    if (data.success) {
                        localStorage.removeItem("user storage");
                        set({user: null})
                        return { success: true, message: data.message };
                    }
                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    toast.error(msg);
                    return { success: false };
                }
            },

            updateProfile: async (formData) => {
                try {
                    set({ profileUpdateLoading: true });
                    const { data } = await axiosInstance.put('/user/profile-update', formData);

                    if (data.success) {
                        toast.success(data.message);
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    toast.error(msg);
                }
                finally {
                    set({ profileUpdateLoading: false });
                }
            },

            getProfile: async () => {
                try {
                    set({ userLoading: true });
                    const { data } = await axiosInstance.get('/user/profile');

                    if (data.success) {
                        set({ user: data.userObject });
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    
                }
                finally {
                    set({ userLoading: false });
                }
            },

            allExperts: async () => {
                try {
                    set({ getExpertLoading: true });
                    const { data } = await axiosInstance.get('/user/get-allProviders');

                    if (data && data.success) {
                        return {
                            success: true,
                            providers: data.providers
                        }
                    }

                    return {success: false}

                } catch (error) {
                    console.log(error?.response?.data?.message || 'Internal server error');
                }
                finally {
                    set({ getExpertLoading: false });
                }
            },

            getExpertById: async (id) => {
                try {
                    const { data } = await axiosInstance.get(`/user/get-providerById/${id}`);

                    if (data && data.success) {
                        return {
                            success: true,
                            provider: data.provider
                        }
                    }

                    return {success: false}

                } catch (error) {
                    console.log(error?.response?.data?.message || 'Internal server error');
                    return {success: false}
                }
            },

            deleteAccount: async (password) => {
                try {
                    set({ accountDltLoading: true });
                    const { data } = await axiosInstance.delete('/user/delete-profile', { data: { password } });

                    if (data?.success) {
                        toast.success(data.message);
                        set({ user: null })
                        return { success: true }
                    }

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
)

export default useUserStore;