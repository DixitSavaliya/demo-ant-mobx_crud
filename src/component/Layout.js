import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const LayoutStructure = (props) => {
    const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="App">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
             <Menu.Item key="1">
              <UserOutlined type="user" />
              <span>Post</span>
              <Link to="/"/>
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined type="user" />
              <span>Home</span>
              <Link to="/home" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <MenuFoldOutlined
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
          {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
        }

export default LayoutStructure;
