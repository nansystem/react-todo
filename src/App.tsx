import { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoSummary } from './components/TodoSummary';
import { Todo } from './types/todo';

function App() {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const localStroageTodoList = localStorage.getItem('todoList');
    if (localStroageTodoList) {
      return JSON.parse(localStroageTodoList);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const changeCompleted = (id: string) => {
    setTodoList((prevList) => {
      return prevList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    });
  };

  const addTodo = (title: string) => {
    setTodoList((prevList) => {
      return [
        { id: crypto.randomUUID(), title, completed: false },
        ...prevList,
      ];
    });
  };

  const deleteTodo = (id: string) => {
    setTodoList((prevList) => {
      return prevList.filter((todo) => todo.id !== id);
    });
  };

  const deleteAllCompleted = () => {
    setTodoList((prevList) => {
      return prevList.filter((todo) => !todo.completed);
    });
  };

  return (
    <main className="mx-auto mt-10 max-w-xl">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="rounded bg-slate-200 p-5">
        <div className="space-y-5">
          <AddTodoForm addTodo={addTodo} />
          <div className="rounded bg-slate-200 p-5">
            <TodoList
              todoList={todoList}
              changeCompleted={changeCompleted}
              deleteTodo={deleteTodo}
            />
            <TodoSummary deleteAllCompleted={deleteAllCompleted} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
