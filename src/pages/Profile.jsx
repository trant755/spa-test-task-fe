import { Card, Avatar, Descriptions, Typography, Space } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Title } = Typography;

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Space
          orientation="vertical"
          size="large"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Avatar
            size={120}
            icon={<UserOutlined />}
            style={{
              backgroundColor: "#1890ff",
              fontSize: "48px",
              margin: "0 auto",
            }}
          />
          <Title level={2} style={{ margin: 0 }}>
            {user?.name || "User"}
          </Title>
        </Space>

        <div style={{ marginTop: "32px" }}>
          <Descriptions
            column={1}
            bordered
            size="large"
            styles={{
              label: {
                fontWeight: "600",
                backgroundColor: "#fafafa",
                width: "200px",
              },
            }}
          >
            <Descriptions.Item
              label={
                <Space>
                  <UserOutlined />
                  <span>Name</span>
                </Space>
              }
            >
              {user?.name || "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <MailOutlined />
                  <span>Email</span>
                </Space>
              }
            >
              {user?.email || "Not specified"}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
