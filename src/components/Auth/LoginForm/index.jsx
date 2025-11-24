import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/authSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await login({
          email: values.email,
          password: values.password,
        });

        const { token, user } = response;

        if (token) {
          dispatch(loginSuccess({ token, user }));
          message.success("Login successful!");
          navigate(from, { replace: true });
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setFieldError("password", "Invalid email or password");
          message.error("Invalid email or password");
        } else {
          console.error(error);
          message.error("Login error. Please try again later.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Form layout="vertical" onFinish={formik.handleSubmit}>
      <Form.Item
        label="Email"
        validateStatus={
          formik.touched.email && formik.errors.email ? "error" : ""
        }
        help={
          formik.touched.email && formik.errors.email ? formik.errors.email : ""
        }
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Enter email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        validateStatus={
          formik.touched.password && formik.errors.password ? "error" : ""
        }
        help={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ""
        }
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={formik.isSubmitting}
          style={{ marginTop: "8px" }}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
