import TodoColumn from './components/TodoColumn';
import NewTodoForm from './components/NewTodoForm';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useTodos } from './hooks/useTodos';
import { 
  ClipboardList, 
  PlayCircle, 
  CheckCircle, 
  Snowflake,
} from 'lucide-react';

function App() {
  const { todos, addTodo, updateTodoStatus, deleteTodo } = useTodos();

  const columns = [
    { 
      title: 'To Do', 
      status: 'todo' as const, 
      icon: ClipboardList 
    },
    { 
      title: 'In Progress', 
      status: 'inProgress' as const, 
      icon: PlayCircle 
    },
    { 
      title: 'Done', 
      status: 'done' as const, 
      icon: CheckCircle 
    },
    { 
      title: 'Frozen', 
      status: 'frozen' as const, 
      icon: Snowflake 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="app-title text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
            Task Manager ✅
          </h1>
          <ThemeSwitcher />
        </div>
        
        <NewTodoForm onAdd={addTodo} />
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 overflow-x-auto pb-4">
          {columns.map(({ title, status, icon }) => (
            <TodoColumn
              key={status}
              title={title}
              icon={icon}
              todos={todos.filter(todo => todo.status === status)}
              status={status}
              onStatusChange={updateTodoStatus}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;