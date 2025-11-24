import { Typography, Card } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <Card
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <HomeOutlined
          style={{ fontSize: "64px", color: "#1890ff", marginBottom: "20px" }}
        />
        <Title level={1}>Welcome!</Title>
        <Paragraph style={{ fontSize: "18px", color: "#666", marginBottom: 0 }}>
          This is the home page of the application.
        </Paragraph>
      </Card>
    </div>
  );
};

export default Home;
