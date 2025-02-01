import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useTodoList } from '@/hooks/useTodoList'

describe('useTodoList', () => {
  beforeEach(() => {
    // ローカルストレージのモックをクリア
    localStorage.clear();
  });

  it('初期状態が空の配列である', () => {
    const { result } = renderHook(() => useTodoList());
    expect(result.current.todoList).toEqual([]);
  });

  it('タスクを追加できる', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.addTodo('新しいタスク');
    });

    expect(result.current.todoList).toHaveLength(1);
    expect(result.current.todoList[0].title).toBe('新しいタスク');
    expect(result.current.todoList[0].completed).toBe(false);
  });

  it('タスクの完了状態を切り替えできる', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.addTodo('テストタスク');
    });

    const taskId = result.current.todoList[0].id;

    act(() => {
      result.current.changeCompleted(taskId);
    });

    expect(result.current.todoList[0].completed).toBe(true);

    act(() => {
      result.current.changeCompleted(taskId);
    });

    expect(result.current.todoList[0].completed).toBe(false);
  });

  it('タスクを削除できる', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.addTodo('削除するタスク');
    });

    const taskId = result.current.todoList[0].id;

    act(() => {
      result.current.deleteTodo(taskId);
    });

    expect(result.current.todoList).toHaveLength(0);
  });

  it('ローカルストレージにタスクが保存される', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.addTodo('保存するタスク');
    });

    // ローカルストレージの内容を確認
    const stored = localStorage.getItem('todoList');
    expect(stored).not.toBeNull();

    const storedTodos = JSON.parse(stored!);
    expect(storedTodos).toHaveLength(1);
    expect(storedTodos[0].title).toBe('保存するタスク');
  });

  it('初期化時にローカルストレージから読み込む', () => {
    // テストデータをローカルストレージに設定
    const testTodos = [
      { id: '1', title: '既存タスク', completed: false }
    ];
    localStorage.setItem('todoList', JSON.stringify(testTodos));

    const { result } = renderHook(() => useTodoList());

    expect(result.current.todoList).toHaveLength(1);
    expect(result.current.todoList[0].title).toBe('既存タスク');
  });
});
