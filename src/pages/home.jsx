import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import Navbar from "../components/layouts/Navbar";

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen mx-auto w-3/4 relative">
      <Navbar />
      <div className="mt-[-70px] flex min-h-screen flex-col text-center w-0/12 lg:flex-row lg:text-left justify-center items-center px-10">
        <div className="">
          <h1 className="text-4xl font-bold mb-5 poppins-extrabold">
            Welcome to Taskify
          </h1>
          <p className="lg:w-1/2 text-gray-500">
            Taskify helps you stay organized and productive. Easily add, edit,
            and manage tasks all in one place. Stay on top of your day and get
            things done with Taskify
          </p>
          <Button
            type={"button"}
            className={"w-28 bg-slate-900 text-white mt-6"}
            onClick={() => navigate('/auth/login')}
          >
            Get Started
          </Button>
        </div>
        <div className="">
          <img src="/todo-transparant-bg.png" className="lg:w-[700px]" alt="" />
        </div>
      </div>
    </div>
  );
}
