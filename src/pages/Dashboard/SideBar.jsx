import React, { useEffect, useState } from 'react';
import {
    PoweroffOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    TruckOutlined,
    ReconciliationOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Index from './Routes';
import { useAuthContext } from '../../context/Auth';

const { Header, Content, Footer, Sider } = Layout;

// ----- MENU ITEMS -----
const items = [
    //   { key: '/dashboard/pages/profile', icon: <UserOutlined />, label: "Profile"  },

    {
        icon: <ShoppingOutlined />, label: "Product", children: [
            { label: <Link style={{ textDecoration: "none" }}>ALL Product</Link>, icon: <ShoppingCartOutlined />, key: "/dashboard/product/all-product" },
            { label: <Link style={{ textDecoration: "none" }} >ADD Product</Link>, icon: <TruckOutlined />, key: "/dashboard/product/add-product" },
            { label: <Link style={{ textDecoration: "none" }}>Card</Link>, icon: <TruckOutlined />, key: "/dashboard/product/card" }
        ]
    },
    { key: '/dashboard/order', icon: <ReconciliationOutlined />, label: <Link style={{ textDecoration: "none" }}>Order</Link> },
    { key: '/dashboard/user', icon: <TeamOutlined />, label: <Link style={{ textDecoration: "none" }}>User</Link> },

];

const SideBar = () => {



    const { handleLogout } = useAuthContext();
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    // --- RESIZE LOGIC ---
    useEffect(() => {
        const handleResize = () => {
            const isMobileSize = window.innerWidth < 768;
            setIsMobile(isMobileSize);
            setCollapsed(isMobileSize); // Collapse if mobile
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once on mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                width={200}
                collapsed={collapsed}
                collapsedWidth={isMobile ? 60 : 80}
                trigger={null}
                style={{
                    overflow: 'auto',
                    transition: 'all 0.3s',
                    backgroundColor: "white"
                }}
                onMouseEnter={() => {
                    if (!isMobile) setCollapsed(false);
                }}
                onMouseLeave={() => {
                    if (!isMobile) setCollapsed(true);
                }}
            >
                <div className="demo-logo-vertical d-flex justify-content-center align-items-center pt-4 pb-2">
                    <button
                        style={{ cursor: 'pointer', borderRadius: '50%' }}
                        className='btn p-1'
                    >
                        <PoweroffOutlined style={{ fontSize: '40px', color: 'black' }} onClick={() => navigate("/")} />
                    </button>
                </div>

                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['/dashboard']}
                    items={items}
                    onClick={({ key }) => {
                        navigate(key); 
                    }}
                />
            </Sider>

            <Layout>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Index />
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by M.Hammad ®
                </Footer>
            </Layout>
        </Layout>
    );
};

export default SideBar;