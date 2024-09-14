
import FormLogin from "../components/fragments/FormLogin";
import AuthLayout from "../components/layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="Welcome Back" desc="Please login first" type="Login">
        <FormLogin/>
    </AuthLayout>
  );
};

export default LoginPage;
