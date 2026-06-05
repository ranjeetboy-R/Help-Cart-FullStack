'use client'

import React, { useEffect } from 'react'
import UserLayoutWrapper from './userComponents/UserLayoutWrapper'
import useUserStore from '../store/useUserStore'

const layout = ({ children }) => {
    const {getProfile} = useUserStore();

    useEffect(() => {
        const getting = async () => {
            await getProfile();
        }
        getting();
    }, [])

    return (
        <div className="relative md:max-w-lg mx-auto w-full">
            <UserLayoutWrapper>
                {children}
            </UserLayoutWrapper>
        </div>
    )
}

export default layout