import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RiAddLargeFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import Button from "../components/elements/Button";
import { useState } from "react";

export default function TaskPage() {
  const [showBar, setShowBar] = useState("flex");
  console.log(showBar)
  return (
    <div className={`flex flex-row bg-slate-50  w-screen h-screen`}>
      <div
        className={`${showBar} flex-col bg-slate-50 w-80 min-h-screen`}
      >
        <div className="flex justify-between items-center w-full bg-slate-200 p-5">
          <h1 className="">Admin</h1>
          <button
            type="button"
            onClick={() => {
              setShowBar("hidden");
            }}
            title="hide bar"
          >
            <MdKeyboardDoubleArrowLeft
              size={28}
              className="hover:text-red-600"
            />
          </button>
        </div>
        <div className="flex flex-col h-screen justify-between bg-slate-600 p-5">
          <ul className="flex flex-col gap-3">
            <li>
              <Link to={"/"}>Welcome</Link>
            </li>
            <li>
              <Link to={"/"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/"}>Tasks</Link>
            </li>
            <li>
              <Link to={"/"}>People</Link>
            </li>
            <li>
              <Link to={"/"}>Reports</Link>
            </li>
            <li>
              <Link to={"/"}>Billing</Link>
            </li>
            <li>
              <Link to={"/"}>Integrations</Link>
            </li>
          </ul>
          <Button className={"flex items-center gap-2 w-28"}>
            Logout
            <IoIosLogOut size={28} />{" "}
          </Button>
        </div>
      </div>
      <button
        className={`${
          showBar === "hidden" ? "absolute" : "hidden"
        } py-5 px-4`}
        onClick={() => setShowBar("flex")}
      >
        <MdKeyboardDoubleArrowRight size={28} color="blue" />
      </button>
      <div className="p-28 w-screen">
        <div className="flex flex-col gap-5 justify-evenly ">
          <h1 className="text-black text-3xl">To-Do</h1>
          <hr />
          <div className="flex flex-row gap-2">
            <Button
              type={"button"}
              className={"flex items-center gap-1 w-28 bg-blue-500 text-white"}
            >
              <RiAddLargeFill /> Add Task
            </Button>
            <Button
              type={"button"}
              className={
                "flex items-center gap-1 w-28 text-black border-2 border-gray-400"
              }
            >
              <CiFilter /> Filter
            </Button>
          </div>
          <div className="flex flex-row items-start justify gap-5 rounded-md border-2 border-gray-200 p-2 mt-5">
            <form action="">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
              />
            </form>
            <div>
              <h1 className="text-lg">Finish Design Grapich</h1>
              <p>Jan, 8, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
