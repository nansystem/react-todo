import { Todo } from '../types/todo';

type Props = {
  todoList: Todo[];
  changeCompleted: (id: string) => void;
};

export const TodoList = ({ todoList, changeCompleted }: Props) => {
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
          </div>
        </div>
      ))}
    </div>
  );
};
