// Breadcrumb.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { RiHome9Line } from 'react-icons/ri';

const Breadcrumb = ({ current }) => {
    return (
        <div className='flex items-center text-sm my-4 gap-2 '>
            <Link to="/">
                <div className='flex items-center gap-1'>
                    <RiHome9Line /> Trang chủ
                </div>
            </Link>
            <div>/</div>
            <div>{current}</div>
        </div>
    );
};

export default Breadcrumb;
