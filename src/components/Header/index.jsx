import { Layout, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Navigation from "./Navigation";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import { logout as logoutAction } from "../../store/authSlice";
import { logout } from "../../api/authApi";

const { Header: AntHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          flex: 1,
        }}
      >
        <Logo />
        <Navigation />
      </div>

      <Space>
        {isAuthenticated ? (
          <UserMenu
            user={user}
            onLogout={handleLogout}
            onProfile={handleProfile}
          />
        ) : (
          <AuthButtons />
        )}
      </Space>
    </AntHeader>
  );
};

export default Header;
