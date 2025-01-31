import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoSummary } from './components/TodoSummary';
import { useTodoList } from './hooks/useTodoList';

function App() {
  const { todoList, changeCompleted, addTodo, deleteTodo, deleteAllCompleted } =
    useTodoList();

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
