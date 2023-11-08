"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AntDesignOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { BodyComponent } from "../components/BodyMapComponent";
import { useStore } from "./context/store";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import AddInjuryComponent from "../components/AddInjuryComponent";
import ProfileComponent from "../components/ProfileComponent";
import ReportsComponent from "../components/ReportsComponent";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const selectedParts = useStore((state) => state?.data);
  // console.log(selectedParts);
  const [Selected, setSelected] = useState("1");

  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <PlusOutlined />,
              label: "Reports",
              onClick: () => {
                setSelected("1");
              },
            },
            {
              key: "2",
              icon: <UnorderedListOutlined />,
              label: "Reports",
              onClick: () => {
                setSelected("2");
              },
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: "Profile",
              onClick: () => {
                setSelected("3");
              },
            },
          ]}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {Selected == "1" ? (
              <AddInjuryComponent />
            ) : Selected == "2" ? (
              <ReportsComponent />
            ) : Selected == "3" ? (
              <div
                style={{
                  width: "30%",
                  height: "30%",
                }}
              >
                <ProfileComponent/>
              </div>
            ) : null}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withPageAuthRequired(Dashboard, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
