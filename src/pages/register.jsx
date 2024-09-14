import FormRegister from "../components/fragments/FormRegister"
import AuthLayout from "../components/layouts/AuthLayout"

const RegisterPage = () => {
    return (
        <AuthLayout type="Register" title="Create Account" desc="please register first">
            <FormRegister/>
        </AuthLayout>
    )
}

export default RegisterPage