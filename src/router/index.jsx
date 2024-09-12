import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import TaskPage from "../pages/tasks";

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/tasks",
      element: <TaskPage/>,
    },
  ]);

export default router