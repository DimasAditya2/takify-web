import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
        <div className="flex items-center justify-center bg-blue-600 w-screen h-screen">
            <div className="text-center text-white p-10 rounded-md shadow-lg bg-blue-800 bg-opacity-75">
                <h1 className="text-4xl font-bold mb-4">Welcome to Taskify</h1>
                <p className="text-lg mb-8">
                    Your ultimate tool to manage your tasks efficiently and effortlessly.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/tasks">
                        <button className="bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-200">
                            Go to Tasks
                        </button>
                    </Link>
                    <Link to="/auth/login">
                        <button className="bg-transparent border-2 border-white text-white py-2 px-4 rounded-md hover:bg-white hover:text-blue-600">
                            Log In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
