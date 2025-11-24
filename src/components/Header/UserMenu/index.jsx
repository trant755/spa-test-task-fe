import { Space, Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const UserMenu = ({ user, onLogout, onProfile }) => {
  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      onLogout?.();
    } else if (key === "profile") {
      onProfile?.();
    }
  };

  return (
    <Dropdown
      menu={{
        items: userMenuItems,
        onClick: handleMenuClick,
      }}
      placement="bottomRight"
    >
      <Space style={{ cursor: "pointer" }}>
        <Avatar icon={<UserOutlined />} />
        <span>{user?.name || "User"}</span>
      </Space>
    </Dropdown>
  );
};

export default UserMenu;
