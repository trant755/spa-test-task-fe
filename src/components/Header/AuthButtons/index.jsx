import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";

const AuthButtons = () => {
  return (
    <Space>
      <Button type="text" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Button>
      <Button type="primary">
        <Link to="/register" style={{ color: "#fff" }}>
          Register
        </Link>
      </Button>
    </Space>
  );
};

export default AuthButtons;
