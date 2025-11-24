import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, FileOutlined } from "@ant-design/icons";

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/items",
      icon: <FileOutlined />,
      label: <Link to="/items">Items</Link>,
    },
  ];

  const selectedKeys = menuItems
    .map((item) => item.key)
    .filter((key) => currentPath === key);

  return (
    <Menu
      mode="horizontal"
      items={menuItems}
      selectedKeys={selectedKeys}
      style={{
        borderBottom: "none",
        lineHeight: "64px",
        flex: 1,
        minWidth: 0,
      }}
    />
  );
};

export default Navigation;
