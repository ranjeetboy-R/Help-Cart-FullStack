'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import UserMenu from './UserMenu';

const UserLayoutWrapper = ({ children }) => {

    const pathname = usePathname();

    const hideLayout = pathname.startsWith('/user/expert/');

    if (hideLayout) {
        return children;
    }

    return (
        <>
            {children}
            <UserMenu />
        </>
    )
}

export default UserLayoutWrapper