import { Todo } from '../types/todo';
import { LucideIcon } from 'lucide-react';
import TodoItem from './TodoItem';

interface TodoColumnProps {
  title: string;
  icon: LucideIcon;
  todos: Todo[];
  status: Todo['status'];
  onStatusChange: (todoId: string, newStatus: Todo['status']) => void;
  onDelete: (todoId: string) => void;
}

const statusColors = {
  todo: 'bg-blue-50 dark:bg-blue-950',
  inProgress: 'bg-yellow-50 dark:bg-yellow-950',
  done: 'bg-green-50 dark:bg-green-950',
  frozen: 'bg-cyan-50 dark:bg-cyan-950'
};

const iconColors = {
  todo: 'text-blue-600 dark:text-blue-400',
  inProgress: 'text-yellow-600 dark:text-yellow-400',
  done: 'text-green-600 dark:text-green-400',
  frozen: 'text-cyan-600 dark:text-cyan-400'
};

export default function TodoColumn({ 
  title, 
  icon: Icon, 
  todos, 
  status, 
  onStatusChange,
  onDelete 
}: TodoColumnProps) {
  return (
    <div className={`flex-1 min-w-[280px] md:min-w-[300px] ${statusColors[status]} rounded-lg p-4`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-5 h-5 ${iconColors[status]}`} />
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">{title}</h2>
        <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full px-2 py-1 text-sm">
          {todos.length}
        </span>
      </div>
      
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}