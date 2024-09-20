import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/home";
import TaskPage from "../pages/tasks";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import WelcomePage from "../pages/welcome";
import Sidebar from "../components/layouts/Sidebar";

const checkLogin = () => {
  if(!localStorage.access_token) {
    return redirect('/auth/login')
  }
  return null
}

const checkNotLogin = () => {
  if(localStorage.access_token) {
    console.log('redirect')
    return redirect('/tasks')
  }

  return null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar/>,
    loader: checkLogin,
    children: [
      {
        path: "/welcome",
        element: <WelcomePage/>,
      },
      {
        path: "/tasks",
        element: <TaskPage/>,
      },
    ]
  },
    {
      path: "/home",
      element: <HomePage/>,
      loader: checkNotLogin
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