import { create } from "zustand";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

const usePaymentStore = create(
    (set) => ({
        paymentLoading: false,

        handlePayment: (resumeId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axiosInstance.post('/payment/create-order', { resumeId });

                    if (!data?.success) {
                        reject({ success: false });
                        return;
                    }

                    const order = data.order;

                    const options = {
                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        amount: order.amount,
                        currency: order.currency,
                        name: 'Run CV (Resume Payment)',
                        description: 'Resume payment',
                        order_id: order.id,

                        handler: async function (response) {
                            try {
                                const { data } = await axiosInstance.post('/payment/verify-payment', response);

                                if (data?.success) {
                                    toast.success("Payment success");
                                    resolve({ success: true }); // ✅ IMPORTANT
                                } else {
                                    reject({ success: false });
                                }

                            } catch (error) {
                                const msg = error?.response?.data?.message || 'Verification failed';
                                toast.error(msg);
                                reject({ success: false });
                            }
                        },

                        theme: {
                            color: '#000000'
                        },

                        method: {
                            upi: true,
                            card: true,
                            netbanking: true,
                            wallet: true,
                        },
                    };

                    const razorpay = new window.Razorpay(options);
                    razorpay.open();

                } catch (error) {
                    const msg = error?.response?.data?.message || 'Payment failed';
                    toast.error(msg);
                    reject({ success: false });
                }
            });
        }
    })
)

export default usePaymentStore;