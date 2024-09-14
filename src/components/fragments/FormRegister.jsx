import { useEffect, useRef, useState } from "react";
import Button from "../elements/Button";
import InputForm from "../elements/Input";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const usernameRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlerRegister = async(event) => {
    setLoading(true)
    event.preventDefault();

    const data = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    }

    try {
      const res = await fetch('https://taskify-server-sage.vercel.app/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 409) {
          throw new Error(`Conflict error: ${errorData.message}`);
        } else {
          throw new Error('Something went wrong');
        } 
      }

      setLoading(false)
      navigate("/auth/login")
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
    
  }

  useEffect(() => {
    usernameRef.current.focus()
  }, [])
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handlerRegister}>
      <InputForm
        label="username"
        htmlFor="username"
        type="username"
        placeholder="ex. John Doe"
        name="username"
        id="username"
        ref={usernameRef}
      />
      <InputForm
        label="email"
        htmlFor="email"
        type="email"
        placeholder="yourmail@mail.com"
        name="email"
        id="email"
      />

      <InputForm
        label="password"
        htmlFor="password"
        type="password"
        placeholder="********"
        name="password"
        id="password"
      />
      <Button className={"w-full mt-5"}>{loading === true ? 'Loading...' : 'Register'}</Button>
    </form>
  );
};

export default FormRegister;
