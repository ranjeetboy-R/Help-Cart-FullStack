import React from 'react'
import UserMenu from './userComponents/UserMenu'
import UserLayoutWrapper from './userComponents/UserLayoutWrapper'

const layout = ({ children }) => {
    return (
        <UserLayoutWrapper>
            {children}
        </UserLayoutWrapper>
    )
}

export default layout