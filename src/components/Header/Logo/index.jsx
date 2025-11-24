import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        color: "#1890ff",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
      onClick={() => navigate("/")}
    >
      Logo
    </div>
  );
};

export default Logo;
