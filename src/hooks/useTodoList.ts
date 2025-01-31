import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

export const useTodoList = () => {
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

  return { todoList, changeCompleted, addTodo, deleteTodo, deleteAllCompleted };
};
