import React from "react";
import { Layout } from "antd";
import { useState } from "react";
import styled from "styled-components";
import DashboardSidebar from "../../components/partials/DashboardSidebar";
import DashboardHeader from "../../components/partials/DashboardHeader";
import DashboardFooter from "../../components/partials/DashboardFooter";
const { Content } = Layout;

const DashboardLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="dashboard" style={{ direction: "ltr" }}>
      <Layout style={{ minHeight: "100vh" }}>
        <DashboardSidebar collapsed={collapsed} />
        <Layout className="site-layout">
          <DashboardHeader collapsed={collapsed} toggle={toggle} />
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
          <DashboardFooter />
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;

