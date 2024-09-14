import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/home";
import TaskPage from "../pages/tasks";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";

const checkLogin = () => {
  if(!localStorage.access_token) {
    return redirect('/auth/login')
  }
  return null
}

const checkNotLogin = () => {
  if(localStorage.access_token) {
    return redirect('/tasks')
  }

  return null
}

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/tasks",
      element: <TaskPage/>,
      loader: checkLogin
    },
    {
      path: "/auth/login",
      element: <LoginPage/>,
      loader: checkNotLogin
    },
    {
      path: "/auth/register",
      element: <RegisterPage/>,
      loader: checkNotLogin
    },
  ]);

export default router