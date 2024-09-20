import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const { children, title, type, desc } = props;
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {title}
            </h1>
            <p className="text-md text-white">{desc}</p>
            {children}
            <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
              {type === "Login"
                ? `Dont Have Account ? ${" "}`
                : `Already have an account ? ${" "}`}

              <Link
                to={type === "Login" ? "/auth/register" : "/auth/login"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 underline hover:text-blue-500"
              >
                {type === "Login" ? "Register" : "Login "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default AuthLayout;
