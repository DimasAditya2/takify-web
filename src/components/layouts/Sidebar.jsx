import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import Button from "../elements/Button";
import { Outlet } from "react-router-dom"; 

const Sidebar = () => {
  const [showBar, setShowBar] = useState(
    localStorage.getItem("showBar") || "flex"
  );
  const [isLoggedIn, setIsLoggedIN] = useState(
    localStorage.getItem("access_token") !== null
  );
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("showBar", showBar);
  }, [showBar]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIN(false);
    navigate("/auth/login");
  };

  if (!isLoggedIn) {
    return null;
  }
  
  return (
    <div className={`flex flex-row bg-slate-50 w-screen h-screen`}>
      <div className={`${showBar} flex-col bg-slate-50 w-80 min-h-screen`}>
        <div className="flex justify-between items-center w-full bg-slate-200 p-5">
          <h1 className="">Admin</h1>
          <button
            type="button"
            onClick={() => {
              setShowBar(
                localStorage.getItem("showBar") == "flex" ? "hidden" : "flex"
              );
            }}
            title="hide bar"
          >
            <MdKeyboardDoubleArrowLeft
              size={28}
              className="hover:text-red-600"
            />
          </button>
        </div>
        <div className="flex flex-col h-screen justify-between p-5 border">
          <ul className="flex flex-col gap-3">
            <li>
              <Link to={"/welcome"}>Welcome</Link>
            </li>
            <li>
              <Link to={"/tasks"} className="flex items-center gap-2">
                <IoIosAddCircle color="blue" size={24} />
                Add Task
              </Link>
            </li>
            <li>
              <Link to={"/tasks"}>Tasks</Link>
            </li>
            <li>
              <Link to={"/faq"}>Faq</Link>
            </li>
          </ul>
          <Button
            className={"flex items-center gap-2 w-28"}
            onClick={handleLogout}
          >
            Logout
            <IoIosLogOut size={28} />{" "}
          </Button>
        </div>
      </div>
      <button
        className={`${showBar === "hidden" ? "absolute" : "hidden"} py-5 px-4`}
        onClick={() => setShowBar("flex")}
      >
        <MdKeyboardDoubleArrowRight size={28} color="blue" />
      </button>
      <Outlet/>
    </div>
  );
};

export default Sidebar;
