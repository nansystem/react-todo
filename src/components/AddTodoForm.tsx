import { useState } from 'react';

type Props = {
  addTodo: (title: string) => void;
};

export const AddTodoForm = ({ addTodo }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo(inputValue);

    setInputValue('');
  };

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="タスクを入力"
        className="w-full rounded border-2 border-slate-300 p-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="rounded bg-blue-500 p-2 text-white">
        追加
      </button>
    </form>
  );
};
