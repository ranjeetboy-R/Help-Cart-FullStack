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
                    const { data } = await axiosInstance.get('/auth/profile');

                    if (data?.success) {
                        set({ user: data.account });
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    console.log(msg);
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
                    set({ getExpertLoading: true });
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
                finally {
                    set({ getExpertLoading: false });
                }
                
            },

            toggleReaction: async (providerId, reaction) => {
                try {
                    const { data } = await axiosInstance.post(`/user/toggle-reaction/${providerId}`, reaction);

                    if (data && data.success) {
                        return {
                            success: true,
                            data
                        }
                    }

                    return {success: false}

                } catch (error) {
                    console.log(error?.response?.data?.message || 'Internal server error');
                    return {success: false}
                }
            },

            saveProvider: async (providerId) => {
                try {
                    const { data } = await axiosInstance.post(`/user/save-provider`, {providerId});

                    if (data && data.success) {                        
                        return {success: true, saved: data.saved };
                    }

                    return {success: false}

                } catch (error) {
                    console.log(error?.response?.data?.message || 'Internal server error');
                    return {success: false}
                }
            },

            getSaveProvider: async () => {
                try {
                    const { data } = await axiosInstance.get(`/user/get-savedProvider`);

                    if (data && data.success) {                        
                        return {success: true, saveProviders: data.providers };
                    }

                    return {success: false}

                } catch (error) {
                    console.log(error?.response?.data?.message || 'Internal server error');
                    return {success: false}
                }
            },
        })
    )
)

export default useUserStore;