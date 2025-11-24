import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { register } from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/authSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await register({
          name: values.name,
          email: values.email,
          password: values.password,
        });

        const { token, user } = response;

        if (token) {
          dispatch(loginSuccess({ token, user }));
          message.success("Registration successful!");
          navigate("/", { replace: true });
        }
      } catch (error) {
        if (error.response?.status === 409) {
          setFieldError("email", "Email already exists");
          message.error("Email already exists");
        } else {
          console.error(error);
          message.error("Registration error. Please try again later.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Form layout="vertical" onFinish={formik.handleSubmit}>
      <Form.Item
        label="Name"
        validateStatus={
          formik.touched.name && formik.errors.name ? "error" : ""
        }
        help={
          formik.touched.name && formik.errors.name ? formik.errors.name : ""
        }
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Enter your name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="large"
        />
      </Form.Item>

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
          prefix={<MailOutlined />}
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

      <Form.Item
        label="Confirm Password"
        validateStatus={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? "error"
            : ""
        }
        help={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : ""
        }
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
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
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
