type Props = {
  deleteAllCompleted: () => void;
};

export const TodoSummary = ({ deleteAllCompleted }: Props) => {
  return (
    <div className="flex justify-end">
      <button className="text-sm text-red-500" onClick={deleteAllCompleted}>
        完了したTodoを削除
      </button>
    </div>
  );
};
