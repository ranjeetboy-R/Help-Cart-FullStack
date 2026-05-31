'use client'

import React, { useEffect, useState } from 'react'
import useUserStore from '../store/useUserStore';
import Experts from '../user/userComponents/Experts';

const page = () => {
    const { allExperts } = useUserStore();
    const [experts, setExperts] = useState([]);

    useEffect(() => {

        const gettingExpert = async () => {
            const res = await allExperts();
            if (res?.success) {
                setExperts(res.providers)
            }
        }
        gettingExpert();
    }, [])

    return (
        <div className="flex flex-col gap-5 p-5">
            <h1>All Experts</h1>

            {/* Popular Experts */}
            <Experts experts={experts} title="Find the right expert for your job." />
        </div>
    )
}

export default page