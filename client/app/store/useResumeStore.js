import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";
import axiosInstance from "../axiosInstance";

const useResumeStore = create(
    persist(
        (set) => ({
            resume: null,
            publicResumes: [],
            publicResumeLoading: false,
            publicResumeById: null,
            resumeByIdLoading: false,
            createResumeLoading: false,
            resumeUpdateLoading: false,

            createResume: async (title) => {
                try {
                    set({ createResumeLoading: true })
                    const { data } = await axiosInstance.post(`/resume/create`, { title });

                    if (data.success) {
                        set({ resume: data.newResume });
                        toast.success(data.message)
                        return { resumeId: data.newResume?._id }
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    toast.error(msg);
                }
                finally {
                    set({ createResumeLoading: false })
                }
            },

            updateResume: async (formData) => {
                try {
                    set({ resumeUpdateLoading: true });
                    const { data } = await axiosInstance.put('/resume/update', formData);

                    if (data.success) {
                        toast.success(data.message);
                        return { success: true, resume: data.resume }
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    toast.error(msg);
                }
                finally {
                    set({ resumeUpdateLoading: false });
                }
            },

            getResumeById: async (resumeId) => {
                try {
                    set({ resumeByIdLoading: true });
                    const { data } = await axiosInstance.get(`/resume/get-resumeById/${resumeId}`);

                    if (data.success) {
                        return { success: true, resume: data.resume }
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    toast.error(msg);
                }
                finally {
                    set({ resumeByIdLoading: false });
                }
            },

            getPublicResumeById: async (resumeId) => {
                try {
                    const { data } = await axiosInstance.get(`/resume/get-publicResumeById/${resumeId}`);

                    if (data.success) {
                        return { success: true, resume: data.resume }
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    toast.error(msg);
                }
            },

            getPublicAllResumes: async () => {
                try {
                    set({publicResumeLoading: true});
                    const { data } = await axiosInstance.get('/resume/get-publicResumes');

                    if (data.success) {
                        return { success: true, resumes: data.resume }
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    return { success: false, message: msg }
                }
                finally{
                    set({publicResumeLoading: false});
                }
            },

            deleteResume: async (resumeId) => {
                try {
                    const { data } = await axiosInstance.delete(`/resume/delete-resume/${resumeId}`);

                    if (data?.success) {
                        toast.success(data.message);
                        return { success: true };
                    }

                } catch (error) {
                    const msg = error.response?.data?.message || "Something went wrong";
                    toast.error(msg);
                }
            },

        })
    )
)

export default useResumeStore;