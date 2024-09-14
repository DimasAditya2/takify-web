import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import TaskPage from "../pages/tasks";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/tasks",
      element: <TaskPage/>,
    },
    {
      path: "/auth/login",
      element: <LoginPage/>,
    },
    {
      path: "/auth/register",
      element: <RegisterPage/>,
    },
  ]);

export default router