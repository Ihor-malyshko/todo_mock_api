import { useState } from "react";
import style from './DeleteButton.module.css';
import { useDeleteTaskMutation } from "../services/tasks";

export default function DeleteButton({ id }: { id: number }) {
  const [deleteTask] = useDeleteTaskMutation();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(id);
    setLoading(false);
  }
  return (
    <button className={style.root}
      disabled={loading}
      onClick={handleDelete}>
      {loading ? <span className="material-symbols-outlined">
        sync
      </span> : <span className="material-symbols-outlined">
        delete
      </span>}
    </button>
  )
}
