import { useEffect, useRef, useState } from "react";
import Button from "../elements/Button";
import InputForm from "../elements/Input";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handlerLogin = async (event) => {
    setLoading(true)
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const res = await fetch(
        "https://taskify-server-sage.vercel.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Response status: ${res.status}`);
      }

     
      const result = await res.json();
      localStorage.setItem("access_token", result.access_token)

      setLoading(false)
      navigate("/")
    } catch (error) {
      console.error("Terjadi kesalahan saat login:", error);
      setLoading(false)
    }
  };

  const emailRef = useRef(null);
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <form className="space-y-4 md:space-y-6 p-2" onSubmit={handlerLogin}>
      <InputForm
        label="email"
        htmlFor="email"
        type="email"
        placeholder="ex. John Doe"
        name="email"
        id="email"
        ref={emailRef}
      />

      <InputForm
        label="password"
        htmlFor="password"
        type="password"
        placeholder="********"
        name="password"
        id="password"
      />

      <Button className={"w-full"}>{loading === true ? 'Loading...' : 'Login'}</Button>
    </form>
  );
};

export default FormLogin;
