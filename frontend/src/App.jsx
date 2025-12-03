import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [operation, setOperation] = useState("Register");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    if (t) {
      setToken(t);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (token) fetchAllTask();
  }, [token]);

  const fetchAllTask = async () => {
    const response = await fetch("https://code-inbound.onrender.com/api/tasks/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    setTasks(data);
  };

  const registerUser = async () => {
    const response = await fetch("https://code-inbound.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(register)
    });
    const data = await response.json();
    if (data.success) {
      setToken(data.token);
      localStorage.setItem("accessToken", data.token);
      setLoggedIn(true);
      toast.success(data.message)
    } else {
      toast.error(data.message);
    }
  };

  const loginUser = async () => {
    const response = await fetch("https://code-inbound.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });
    const data = await response.json();
    if (data.success) {
      setToken(data.token);
      localStorage.setItem("accessToken", data.token);
      setLoggedIn(true);
      toast.success(data.message)
    } else {
      toast.error(data.message);
    }
  };

  const createTask = async () => {
    if (!taskInput.trim()) return;
    
    if (editingId) {
      const response = await fetch(`https://code-inbound.onrender.com/api/tasks/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: taskInput })
      });
      const data = await response.json();
      if (data.success) {
        setTaskInput("");
        setEditingId(null);
        fetchAllTask();
        toast.success(data.message)
      }
    } else {
      const response = await fetch("https://code-inbound.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: taskInput })
      });
      const data = await response.json();
      if (data.success) {
        setTaskInput("");
        fetchAllTask();
        toast.success(data.message)
      }
    }
  };

  const deleteTask = async (id) => {
    const response = await fetch(`https://code-inbound.onrender.com/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.success) {
      fetchAllTask();
      toast.success(data.message)
    }
  };

  const startEdit = (task) => {
    setTaskInput(task.title);
    setEditingId(task.id);
  };

  return (
    <>
      {loggedIn ? (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-100">
          <div
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("accessToken");
            }}
            className="absolute top-10 right-10 text-white rounded-xl bg-red-400 p-3"
          >
            Logout
          </div>

          <h1 className="text-6xl font-bold text-slate-800">Task management</h1>

          <div className="w-[60vw] p-10 h-[75vh] flex-col shadow-2xl flex gap-3 mt-10 rounded-3xl bg-white">
            <div className="flex gap-3">
              <input
                className="pl-3 w-full py-2 outline-none border rounded-xl"
                placeholder="Enter next task here..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                type="text"
              />
              <button
                onClick={createTask}
                className="p-2 bg-blue-500 px-8 rounded-xl text-white"
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>

            <div className="w-full h-full p-5 bg-slate-50 rounded-2xl flex flex-col gap-4 shadow-inner overflow-y-auto">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="w-full h-[70px] bg-white flex items-center px-3 justify-between rounded-2xl shadow"
                >
                  <div>{task.title}</div>

                  <div className="flex gap-9">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-2xl"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => startEdit(task)}
                      className="bg-green-500 text-white px-4 py-2 rounded-2xl"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen bg-slate-100 flex items-center justify-center">
          <div className="w-[400px] h-[420px] shadow-2xl bg-white rounded-2xl flex flex-col p-10">
            <p className="text-2xl mx-auto">{operation}</p>

            {operation === "Register" ? (
              <div className="mt-5 gap-3 flex flex-col">
                <div className="gap-1 flex flex-col">
                  <p>name</p>
                  <input
                    type="text"
                    placeholder="enter name..."
                    onChange={(e) =>
                      setRegister({ ...register, name: e.target.value })
                    }
                    className="w-full outline-none bg-slate-100 p-2 rounded-xl"
                  />
                </div>

                <div className="gap-1 flex flex-col">
                  <p>email</p>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegister({ ...register, email: e.target.value })
                    }
                    placeholder="enter email..."
                    className="w-full outline-none bg-slate-100 p-2 rounded-xl"
                  />
                </div>

                <div className="gap-1 flex flex-col">
                  <p>password</p>
                  <input
                    type="password"
                    onChange={(e) =>
                      setRegister({ ...register, password: e.target.value })
                    }
                    placeholder="enter password..."
                    className="w-full outline-none bg-slate-100 p-2 rounded-xl"
                  />
                </div>

                <button
                  onClick={registerUser}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl"
                >
                  Submit
                </button>

                <p
                  onClick={() => setOperation("Login")}
                  className="mt-2 text-purple-500 text-center cursor-pointer"
                >
                  login
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mt-10">
                <div className="gap-1 flex flex-col">
                  <p>email</p>
                  <input
                    type="text"
                    placeholder="enter email..."
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full outline-none bg-slate-100 p-2 rounded-xl"
                  />
                </div>

                <div className="gap-1 flex flex-col">
                  <p>password</p>
                  <input
                    type="password"
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    placeholder="enter password..."
                    className="w-full outline-none bg-slate-100 p-2 rounded-xl"
                  />
                </div>

                <button
                  onClick={loginUser}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl"
                >
                  Submit
                </button>

                <p
                  onClick={() => setOperation("Register")}
                  className="mt-2 text-purple-500 text-center cursor-pointer"
                >
                  register
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default App;