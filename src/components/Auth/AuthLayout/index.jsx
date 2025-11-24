import { Card } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

const AuthLayout = ({ title, children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        padding: "24px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
          {title}
        </Title>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
