import { Button, Flex, Menu } from "antd";
import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUserComponent/AdminUser";
import AdminProduct from "../../components/AdminProductComponent/AdminProduct";


const AdminPage = () => {
    const items = [
        {
            key: 'user',
            icon: <UserOutlined />,
            label: 'Người dùng',

        },
        {
            key: 'product',
            icon: <AppstoreOutlined />,
            label: 'Sản phẩm',


        },

    ];
    const getLevelKeys = (items1) => {
        const key = {};
        const func = (items2, level = 1) => {
            items2.forEach((item) => {
                if (item.key) {
                    key[item.key] = level;
                }
                if (item.children) {
                    func(item.children, level + 1);
                }
            });
        };
        func(items1);
        return key;
    };

    const [keySelected, setKeySelected] = useState('');
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'product':
                return (
                    <AdminProduct />
                )
            default:
                return <></>
        }

    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    console.log('keyselected', keySelected)
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <div style={{ marginBottom: '85px' }}>
                <HeaderComponent isHiddenSearch isHiddenCart />
            </div>
            <div style={{ display: 'flex', height: '100vh', boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ width: collapsed ? '80px' : '256px', transition: 'width 0.3s ease' }}>
                    <Button
                        type="primary"
                        onClick={toggleCollapsed}
                        style={{
                            margin: '10px',
                        }}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        style={{
                            height: '100vh',
                            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
                            
                        }}
                        inlineCollapsed={collapsed}
                        items={items}
                        onClick={handleOnClick}
                    />

                </div>
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', overflowY: 'auto' }}>
                    {renderPage(keySelected)}
                </div>
            </div>




        </>
    )
}

export default AdminPage