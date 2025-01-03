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
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [darkMode, setDarkMode] = useState(null); // State for dark mode

  useEffect(() => {
    // Detect OS preference and set initial state
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Check for user preference in localStorage
    const savedPreference = localStorage.getItem('darkMode');
    setDarkMode(savedPreference !== null ? JSON.parse(savedPreference) : prefersDark);

    // Listen for changes in OS preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (darkMode === null) {
        setDarkMode(mediaQuery.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
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
      }, 2000); // Clear after 2 seconds
    }
  }, [errorMessage]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      const isDuplicate = todos.some(todo => todo.text.toLowerCase() === input.trim().toLowerCase());
      if (isDuplicate) {
        setErrorMessage("This task already exists!"); // Set error message
        setInput(""); // Clear the input field
        return;
      }
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400 dark:from-blue-800 dark:to-emerald-600">
      <div className="bg-white shadow-lg rounded-3xl p-16 dark:bg-gray-800 dark:text-white">

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6 font-funnel dark:text-white">React Todo list ✅</h1>

        <div className="mb-4 flex font-oswald relative">
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
            className={`flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errorMessage ? 'placeholder:text-red-500 dark:placeholder:text-red-500' : ''} dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400`}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2 font-oswald">
          {
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
              >
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => setTodos(
                    todos.map((t) => (
                      t.id === todo.id ? {...t, completed: !t.completed} : t
                    ))
                  )}
                  className={`mr-2 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-black dark:border-gray-600 dark:focus:ring-blue-400`}
                />
                <span
                  className={`flex-grow ${todo.completed ? "line-through text-gray-500" : "text-gray-800 dark:text-gray-200"}`}
                >{todo.text}</span>

                <button
                  onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                  className={`ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 ${todo.completed ? 'opacity-50' : ''} dark:bg-red-700 dark:hover:bg-red-800`}
                >
                  Delete
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;