import { useState } from "react";
import { useCreateTaskMutation } from "../services/tasks";


export default function AddButton({ type }: { type: string }) {
  const [addTask] = useCreateTaskMutation();
  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    setLoading(true);
    await addTask({ title: `New Task in ${type}`, status: type });
    setLoading(false);
  }
  return (
    <button style={{ margin: '8px 0' }}
      disabled={loading}
      onClick={handleAdd}>
      {loading ? <span className="material-symbols-outlined">
        sync
      </span> : `Add task "${type}"`
      }
    </button>
  )
}
