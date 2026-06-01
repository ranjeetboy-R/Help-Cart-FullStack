import React from 'react';
import { Select } from 'antd';
import { categories } from '@/public/assests';


const SelectProfession = ({setProfession, profession}) => {

    const options = [];

    categories?.map((categori) => {
        options.push({
            value: categori.key,
            label: categori.title
        })
    })

    const handleChange = (value) => {
        setProfession(value);
    };


    return (
        <Select
            mode="tags"
            size='large'
            style={{ width: '100%' }}
            placeholder="Search your profession..."
            onChange={handleChange}
            value={profession}
            options={options}
        />
    )
};

export default SelectProfession;