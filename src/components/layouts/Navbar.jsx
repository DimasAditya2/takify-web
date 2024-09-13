import { Link } from "react-router-dom";
import Button from "../elements/Button";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between items-center px-10 bg-slate-900 w-full rounded-md h-16 z-50 shadow-lg mt-2">
      <h1 className="text-3xl text-white poppins-bold">Taskify</h1>
      <div className="flex items-center gap-5">
        <ul className="flex gap-6 text-white">
          <li>
            <Link to={"/ask"} className="hover:text-blue-400">
              Ask
            </Link>
          </li>
          <li>
            <Link to={"/features"} className="hover:text-blue-400">
              Features
            </Link>
          </li>
          <li>
            <Link to={"/price"} className="hover:text-blue-400">
              Price
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="hover:text-blue-400">
              About
            </Link>
          </li>
        </ul>
        <Button type={"button"}>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
