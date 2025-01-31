import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { dummyTodoList } from './data/dummyTodoList';

function App() {
  const [todoList, setTodoList] = useState(dummyTodoList);

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

  return (
    <main className="mx-auto mt-10 max-w-xl">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="rounded bg-slate-200 p-5">
        <div className="space-y-5">
          <AddTodoForm addTodo={addTodo} />
          <div className="rounded bg-slate-200 p-5">
            <TodoList todoList={todoList} changeCompleted={changeCompleted} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
