import { create } from "zustand";
import toast from "react-hot-toast";
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

        deleteImage: async (public_id) => {
            try {
                const { data } = await axiosInstance.post('/provider/delete-image', {public_id});    

                if (data.success) {
                    toast.success(data.message);
                    return { success: true }
                }

            } catch (error) {
                const msg = error.response?.data?.message || "Something went wrong";
                toast.error(msg);
            }
        },
        
        deleteServiceCharge: async (id) => {
            try {
                const { data } = await axiosInstance.post('/provider/delete-serviceCharge', {id});    

                if (data.success) {
                    toast.success("Deleted");
                    return { success: true }
                }

            } catch (error) {
                const msg = error.response?.data?.message || "Something went wrong";
                toast.error(msg);
            }
        },
    })
)

export default useProviderStore;