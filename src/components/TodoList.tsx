import { Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

type Props = {
  todoList: Todo[];
  changeCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export const TodoList = ({ todoList, changeCompleted, deleteTodo }: Props) => {
  return (
    <div className="space-y-3">
      {todoList.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-3 hover:cursor-pointer hover:bg-slate-300"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              className="size-5"
              checked={todo.completed}
              onChange={() => changeCompleted(todo.id)}
            />
            <span className={`${todo.completed ? 'line-through' : ''}`}>
              {todo.title}
            </span>
            <button className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300">
              <Trash2
                className="size-5 text-gray-500"
                onClick={() => deleteTodo(todo.id)}
              />
            </button>
          </div>
        </div>
      ))}
      {todoList.length === 0 && (
        <p className="text-center text-gray-500">タスクがありません</p>
      )}
    </div>
  );
};
