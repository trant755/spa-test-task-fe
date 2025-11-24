import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "./Header";

const SharedLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout.Content style={{ padding: "24px" }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default SharedLayout;
