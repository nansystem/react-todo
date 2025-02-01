import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../../src/components/TodoList';
import { Todo } from '../../src/types/todo';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: '1', title: '買い物に行く', completed: false },
    { id: '2', title: '本を読む', completed: true },
  ];
  const mockChangeCompleted = vi.fn();
  const mockDeleteTodo = vi.fn();

  it('TodoListが正しく表示される', () => {
    render(
      <TodoList
        todoList={mockTodos}
        changeCompleted={mockChangeCompleted}
        deleteTodo={mockDeleteTodo}
      />,
    );

    expect(screen.getByText('買い物に行く')).toBeInTheDocument();
    expect(screen.getByText('本を読む')).toBeInTheDocument();
  });

  it('チェックボックスの状態が正しく反映される', () => {
    render(
      <TodoList
        todoList={mockTodos}
        changeCompleted={mockChangeCompleted}
        deleteTodo={mockDeleteTodo}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it('完了したタスクに取り消し線が表示される', () => {
    render(
      <TodoList
        todoList={mockTodos}
        changeCompleted={mockChangeCompleted}
        deleteTodo={mockDeleteTodo}
      />,
    );

    const completedTask = screen.getByText('本を読む');
    expect(completedTask).toHaveClass('line-through');
  });

  it('チェックボックスをクリックするとchangeCompletedが呼ばれる', () => {
    render(
      <TodoList
        todoList={mockTodos}
        changeCompleted={mockChangeCompleted}
        deleteTodo={mockDeleteTodo}
      />,
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(mockChangeCompleted).toHaveBeenCalledWith('1');
  });

  it('削除ボタンをクリックするとdeleteTodoが呼ばれる', () => {
    render(
      <TodoList
        todoList={mockTodos}
        changeCompleted={mockChangeCompleted}
        deleteTodo={mockDeleteTodo}
      />,
    );

    const deleteButtons = screen.getAllByRole('button');
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteTodo).toHaveBeenCalledWith('1');
  });

  it('タスクが空の場合、メッセージが表示される', () => {
    render(
      <TodoList
        todoList={[]}
        changeCompleted={mockChangeCompleted}
        deleteTodo={mockDeleteTodo}
      />,
    );

    expect(screen.getByText('タスクがありません')).toBeInTheDocument();
  });
});
