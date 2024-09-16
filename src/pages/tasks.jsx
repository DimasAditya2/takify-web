import { useEffect, useState } from "react";
import { MdTaskAlt } from "react-icons/md";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await fetch("https://taskify-server-sage.vercel.app/tasks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();

      if (result.status) {
        setTasks(result.data);
      } else {
        console.log("Failed to fetch tasks:", result.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function handleStatusChange(taskId, newStatus) {
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        `https://taskify-server-sage.vercel.app/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await res.json();

      if (result.status) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.task_id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } else {
        console.log("Failed to update task:", result.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function handleDelete(taskId) {
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        `https://taskify-server-sage.vercel.app/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (result.status) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskId));
      } else {
        console.log("Failed to delete task:", result.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div className="w-full p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl mb-5">Tasks</h1>
      <p className="flex gap-2 items-center bg-gray-200 max-w-max px-2 rounded-md mb-8">
        <MdTaskAlt size={16} /> {tasks.length} Tasks
      </p>

      <div className="bg-white rounded-lg shadow-md p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.task_id} className="p-2 mb-2 bg-gray-50 rounded-md flex justify-between items-center">
              <div>
                <p className="font-bold">{task.title}</p>
                <p className="text-sm text-gray-600">Status: {task.status}</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Dropdown untuk mengubah status */}
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.task_id, e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="progress">Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => handleDelete(task.task_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks</p>
        )}
      </div>
    </div>
  );
}
