import { Todo } from '../types/todo';
import { 
  ArrowLeftCircle, 
  ArrowRightCircle,
  Snowflake,
  Trash2
} from 'lucide-react';
import { formatDateTime } from '../utils/dateFormatter';

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (todoId: string, newStatus: Todo['status']) => void;
  onDelete: (todoId: string) => void;
}

const statusOrder: Todo['status'][] = ['todo', 'inProgress', 'done', 'frozen'];

export default function TodoItem({ todo, onStatusChange, onDelete }: TodoItemProps) {
  const currentStatusIndex = statusOrder.indexOf(todo.status);

  const moveLeft = () => {
    if (currentStatusIndex > 0) {
      onStatusChange(todo.id, statusOrder[currentStatusIndex - 1]);
    }
  };

  const moveRight = () => {
    if (currentStatusIndex < statusOrder.length - 1 && todo.status !== 'frozen') {
      onStatusChange(todo.id, statusOrder[currentStatusIndex + 1]);
    }
  };

  const toggleFreeze = () => {
    if (todo.status === 'frozen') {
      onStatusChange(todo.id, 'todo');
    } else if (todo.status !== 'done') {
      onStatusChange(todo.id, 'frozen');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-800 dark:text-gray-200">{todo.title}</span>
        <div className="flex gap-1">
          {currentStatusIndex > 0 && todo.status !== 'frozen' && (
            <button 
              onClick={moveLeft}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              title="Move back"
            >
              <ArrowLeftCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}
          
          {todo.status !== 'done' && (
            <button 
              onClick={toggleFreeze}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              title={todo.status === 'frozen' ? 'Unfreeze' : 'Freeze'}
            >
              <Snowflake className={`w-4 h-4 ${todo.status === 'frozen' ? 'text-cyan-500' : 'text-gray-600 dark:text-gray-400'}`} />
            </button>
          )}

          {currentStatusIndex < statusOrder.length - 1 && todo.status !== 'frozen' && todo.status !== 'done' && (
            <button 
              onClick={moveRight}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              title="Move forward"
            >
              <ArrowRightCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}

          <button 
            onClick={() => onDelete(todo.id)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Created on {formatDateTime(todo.createdAt)}
      </div>
    </div>
  );
}