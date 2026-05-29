'use client'

import React from 'react';
import { Dropdown, Space } from 'antd';
import { IoIosArrowDown } from 'react-icons/io';
import { CiLocationOn } from 'react-icons/ci';

const items = [
    // {
    //     label: (
    //         <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
    //             1st menu item
    //         </a>
    //     ),
    //     key: '0',
    // },
    // {
    //     type: 'divider',
    // },
    // {
    //     label: '3rd menu item',
    //     key: '3',
    // },
];

const LocationDropdown = () => (
    <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={e => e.preventDefault()} className='cursor-pointer'>
            <Space>
                <span className='text-sm text-slate-600 font-semibold flex items-center gap-1'>
                    <CiLocationOn className='size-4' />
                    Mohjamma, Muzaffarpur
                </span>
                <IoIosArrowDown className='size-4 text-slate-600' />
            </Space>
        </a>
    </Dropdown>
);
export default LocationDropdown;