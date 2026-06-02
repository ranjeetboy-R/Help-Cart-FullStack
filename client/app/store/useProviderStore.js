import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";
import axiosInstance from "../axiosInstance";

const useProviderStore = create(
    (set) => ({
        provider: null,
        userLoading: false,
        profileUpdateLoading: false,
        accountDltLoading: false,
        getExpertLoading: false,

        updateProviderProfile: async (formData) => {
            try {
                set({ profileUpdateLoading: true });
                const { data } = await axiosInstance.put('/provider/update-provider', formData);                

                if (data.success) {
                    toast.success(data.message);
                    set({ provider: data.provider });
                    return { success: true, provider: data.provider }
                }

            } catch (error) {
                const msg = error.response?.data?.message || "Something went wrong";
                toast.error(msg);
            }
            finally {
                set({ profileUpdateLoading: false });
            }
        },

        getUserDetailsWhoSaveProvider: async () => {
            try {
                const { data } = await axiosInstance.get(`/provider/getUserDetails`);

                if (data && data.success) {
                    return {
                        success: true,
                        users: data.saveUser
                    }
                }

                return { success: false }

            } catch (error) {
                console.log(error?.response?.data?.message || 'Internal server error');
                return { success: false }
            }
        },

    })
)

export default useProviderStore;