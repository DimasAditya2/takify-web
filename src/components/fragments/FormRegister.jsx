import { useEffect, useRef } from "react";
import Button from "../elements/Button";
import InputForm from "../elements/Input";

const FormRegister = () => {
  const usernameRef = useRef(null)

  useEffect(() => {
    usernameRef.current.focus()
  }, [])
  return (
    <form className="space-y-4 md:space-y-6" action="#">
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
      <Button className={"w-full mt-5"}>Register</Button>
    </form>
  );
};

export default FormRegister;
