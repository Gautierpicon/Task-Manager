import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Error parsing LocalStorage data:", error);
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedPreference = localStorage.getItem('darkMode');
    setDarkMode(savedPreference !== null ? JSON.parse(savedPreference) : prefersDark);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (darkMode === null) {
        setDarkMode(mediaQuery.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      document.body.classList.toggle('dark-mode', darkMode);
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
  }, [darkMode]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  }, [errorMessage]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      const isDuplicate = todos.some(todo => todo.text.toLowerCase() === input.trim().toLowerCase());
      if (isDuplicate) {
        setErrorMessage("This task already exists!");
        setInput("");
        return;
      }
      setTodos([...todos, { id: Date.now(), text: input, status: "To Do", completed: false }]);
      setInput("");
    }
  };

  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          if (todo.status === "To Do") return { ...todo, status: "In Progress" };
          if (todo.status === "In Progress") return { ...todo, status: "Completed", completed: true };
          if (todo.status === "Completed") return { ...todo, status: "To Do", completed: false };
        }
        return todo;
      })
    );
  };

  const freezeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: "Frozen", completed: false } : todo
      )
    );
  };

  const unfreezeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: "To Do", completed: false } : todo
      )
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "To Do":
        return "bg-blue-200 text-blue-800";
      case "In Progress":
        return "bg-yellow-200 text-yellow-800";
      case "Completed":
        return "bg-green-200 text-green-800";
      case "Frozen":
        return "bg-cyan-200 text-cyan-800";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "To Do":
        return (
          <svg
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        );
      case "In Progress":
        return (
          <svg
            className="h-4 w-4 mr-1"
            stroke="currentColor" 
            viewBox="-2.4 -2.4 28.80 28.80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <path 
                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round">
              </path>
            </g>
          </svg>
        );
      case "Completed":
        return (
          <svg
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "Frozen":
        return (
          <svg
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            strokeWidth={2}
          >
            <g id="snow" transform="translate(-2 -2)">
              <path
                id="primary"
                d="M3,12H21M12,3V21"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                id="primary-2"
                data-name="primary"
                d="M19,9l-2,3,2,3"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                id="primary-3"
                data-name="primary"
                d="M5,15l2-3L5,9"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                id="primary-4"
                data-name="primary"
                d="M15,19l-3-2L9,19"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                id="primary-5"
                data-name="primary"
                d="M9,5l3,2,3-2"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  const FreezeIcon = ({ color }) => (
    <svg
      className="h-4 w-4 mr-1"
      fill="none"
      viewBox="0 0 20 20"
      stroke={color}
      strokeWidth={2}
    >
      <g id="snow" transform="translate(-2 -2)">
        <path
          id="primary"
          d="M3,12H21M12,3V21"
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <path
          id="primary-2"
          data-name="primary"
          d="M19,9l-2,3,2,3"
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <path
          id="primary-3"
          data-name="primary"
          d="M5,15l2-3L5,9"
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <path
          id="primary-4"
          data-name="primary"
          d="M15,19l-3-2L9,19"
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <path
          id="primary-5"
          data-name="primary"
          d="M9,5l3,2,3-2"
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </g>
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400 dark:from-blue-800 dark:to-emerald-600">
      <div className="bg-white shadow-lg rounded-3xl p-16 dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6 dark:text-white font-funnel">Todo-List ✅</h1>

        <div className="mb-4 flex font-oswald">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
            type="text" 
            placeholder={errorMessage || "Add a new todo"} 
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2 font-oswald">
          {todos.map((todo) => (
            <li key={todo.id} className="flex flex-col p-3 rounded-lg bg-slate-100 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleStatus(todo.id)}
                  className="mr-2 h-5 w-5 text-blue-600 cursor-pointer"
                />
                <span className={`flex-grow ${todo.completed ? "line-through text-gray-500" : "text-gray-800 dark:text-gray-200"}`}>
                  {todo.text}
                </span>

                {todo.status !== "Completed" && (
                  todo.status === "Frozen" ? (
                    <button
                      onClick={() => unfreezeTodo(todo.id)}
                      className="flex items-center ml-2 border-none p-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-800"
                    >
                      <FreezeIcon color="white" />
                      Unfreeze
                    </button>
                  ) : (
                    <button
                      onClick={() => freezeTodo(todo.id)}
                      className="flex items-center ml-2 border-none p-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-800"
                    >
                      <FreezeIcon color="white" />
                      Freeze
                    </button>
                  )
                )}

                <button
                  onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                  className="flex items-center ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                >
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </svg>
                  Delete
                </button>
              </div>
              <div className={`mt-2 text-sm px-3 py-1 rounded flex items-center justify-center ${getStatusStyle(todo.status)}`}>
                {getStatusIcon(todo.status)}
                {todo.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;