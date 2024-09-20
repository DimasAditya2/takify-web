import { useEffect, useState } from "react";
import Modal from "react-modal";
import { MdTaskAlt } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import Loading from "../components/layouts/Loading";
import Button from "../components/elements/Button";

Modal.setAppElement("#root");

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
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
        setLoading(false);
      } else {
        console.log("Failed to fetch tasks:", result.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  async function handleEdit(taskId, updatedTask) {
    const token = localStorage.getItem("access_token");

    try {
      // eslint-disable-next-line no-unused-vars
      const { _id, user_id, createdAt, updatedAt, __v, ...taskData } =
        updatedTask;

      const res = await fetch(
        `https://taskify-server-sage.vercel.app/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        }
      );

      const result = await res.json();

      if (result.status) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.task_id === taskId ? { ...task, ...taskData } : task
          )
        );
        closeModal();
      } else {
        console.log("Failed to update task:", result.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function handleDelete(taskId) {
    setLoadingDelete(true);
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await fetch(
        `https://taskify-server-sage.vercel.app/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        console.log("Delete success");
        setLoadingDelete(false);
        fetchTasks();
      } else {
        const result = await res.json();
        setLoadingDelete(false);
        console.error("Delete failed:", result.message || "Unknown error");
      }
    } catch (error) {
      setLoadingDelete(false);
      console.error("Delete failed:", error);
    }
  }

  function openModal(task) {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  }

  function closeModal() {
    setSelectedTask(null);
    setIsEditModalOpen(false);
  }

  const getStatusClass = (status) => {
    if (status === "progress") return "bg-yellow-400";
    if (status === "completed") return "bg-green-400";
    if (status === "pending") return "bg-red-400";
    return "bg-gray-300";
  };

  if (!loading && tasks.length == 0) {
    return (
      <div className="flex justify-center w-full items-center text-3xl">
        No Task Found
      </div>
    );
  }

  if (loadingDelete) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center w-full ">
        <div className="w-14 h-14 rounded-[50%] border-4 flex justify-center items-center animate-spin">
          <div className="w-12 h-12    rounded-[50%]">
            <div className="w-2 h-2 bg-red-500 rounded"></div>
          </div>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl mb-5 mt-5">Tasks</h1>
      <p className="flex gap-2 items-center bg-gray-200 max-w-max px-2 rounded-md mb-8">
        <MdTaskAlt size={16} /> {tasks.length} Tasks
      </p>

      <div className="bg-white rounded-lg shadow-md p-4 max-h-[80%] overflow-y-auto">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.task_id}
              className="p-2 mb-2 bg-gray-50 rounded-md flex justify-between items-center"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <p className="font-bold">{task.title} </p>
                  <p>Description: {task.description || ""}</p>
                </div>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span
                    className={`${getStatusClass(
                      task.status
                    )} text-gray-50 px-2 py-1 rounded-md`}
                  >
                    {task.status}
                  </span>
                </p>
                <p className="flex gap-2 items-center">
                  {task.dueDate && <CiCalendarDate size={22} color="red" />}
                  {task.dueDate?.split("T")[0] || ""}
                </p>
                Priority: {" "} 
                {task.priority}
                <p></p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={"bg-red-500 text-white"}
                  onClick={() => handleDelete(task.task_id)}
                  className={"flex"}
                  disabled={loadingDelete}
                >
                  Delete
                </Button>
                <Button onClick={() => openModal(task)} className={"w-22"}>
                  Edit
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>

      {/* Modal Edit */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Task"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2 className="text-xl mb-4">Edit Task</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(selectedTask.task_id, selectedTask);
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={selectedTask.title}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, title: e.target.value })
                }
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                value={selectedTask.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                value={selectedTask.status}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, status: e.target.value })
                }
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="pending">Pending</option>
                <option value="progress">Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Due Date</label>
              <input
                type="date"
                value={
                  selectedTask.dueDate ? selectedTask.dueDate.split("T")[0] : ""
                }
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, dueDate: e.target.value })
                }
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Priority</label>
              <select
                value={selectedTask.priority}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, priority: e.target.value })
                }
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white px-3 py-1 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-3 py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
