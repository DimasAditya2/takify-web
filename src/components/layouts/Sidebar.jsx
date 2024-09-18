import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import Button from "../elements/Button";
import { Outlet } from "react-router-dom"; 
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Sidebar = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBar, setShowBar] = useState(
    localStorage.getItem("showBar") || "flex"
  );
  const [isLoggedIn, setIsLoggedIN] = useState(
    localStorage.getItem("access_token") !== null
  );
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("showBar", showBar);
  }, [showBar]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIN(false);
    navigate("/auth/login");
  };

  if (!isLoggedIn) {
    return null;
  }

  function openModal() {
    setIsAddModalOpen(true);
  }

  function closeModal() {
    setIsAddModalOpen(false);
  }

  const handleAdd = async(selectedTask) => {
    const token = localStorage.getItem("access_token")
    try {
      const res = await fetch("https://taskify-server-sage.vercel.app/tasks", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedTask)
      })

      if (res.ok) {
        console.log("Add Success");
        await fetchTasks(); 
        closeModal()
        // navigate("/tasks")
      } else {
        console.log(res)
        console.error("Add failed:")
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTasks() {
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
        setLoading(false);
      } else {
        console.log("Failed to fetch tasks:", result.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  }


  
  return (
    <div className={`flex flex-row bg-slate-50 w-screen h-screen`}>
      <div className={`${showBar} flex-col bg-slate-50 w-80 min-h-screen`}>
        <div className="flex justify-between items-center w-full bg-slate-200 p-5">
          <h1 className="">Admin</h1>
          <button
            type="button"
            onClick={() => {
              setShowBar(
                localStorage.getItem("showBar") == "flex" ? "hidden" : "flex"
              );
            }}
            title="hide bar"
          >
            <MdKeyboardDoubleArrowLeft
              size={28}
              className="hover:text-red-600"
            />
          </button>
        </div>
        <div className="flex flex-col h-screen justify-between p-5 border">
          <ul className="flex flex-col gap-3">
            <li>
              <Link to={"/welcome"}>Welcome</Link>
            </li>
            <li>
              <Button to={"/tasks"} onClick={() => openModal()} className="flex items-center gap-2">
                <IoIosAddCircle color="blue" size={24} />
                Add Task
              </Button>
            </li>
            <li>
              <Link to={"/tasks"}>Tasks</Link>
            </li>
            <li>
              <Link to={"/faq"}>Faq</Link>
            </li>
          </ul>
          <Button
            className={"flex items-center gap-2 w-28"}
            onClick={handleLogout}
          >
            Logout
            <IoIosLogOut size={28} />{" "}
          </Button>
        </div>
      </div>
      <button
        className={`${showBar === "hidden" ? "absolute" : "hidden"} py-5 px-4`}
        onClick={() => setShowBar("flex")}
      >
        <MdKeyboardDoubleArrowRight size={28} color="blue" />
      </button>
      <Outlet/>

      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add Task"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2 className="text-xl mb-4">Add Task</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd(selectedTask);
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, title: e.target.value })
                }
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
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
             
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, dueDate: e.target.value })
                }
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Priority</label>
              <select
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
                disabled={loading}
              >
                {loading == true ? 'Loading' : 'Save'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
    
  );
};

export default Sidebar;
