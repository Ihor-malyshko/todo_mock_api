import { useUpdateTaskMutation } from '../services/tasks'
import Status from './Status';


export default function Board({ data }: { data: { id: number; title: string; status: string }[] }) {

  const [updateTask] = useUpdateTaskMutation()

  const handleTaskMove = (taskId: number, newStatus: string) => {
    updateTask({ id: taskId, status: newStatus })
  }

  const [dataTodo, dataDoing, dataDone] = data.reduce((acc, item) => {
    if (item.status === 'todo') acc[0].push(item)
    if (item.status === 'doing') acc[1].push(item)
    if (item.status === 'done') acc[2].push(item)
    return acc
  }, [[], [], []] as { id: number; title: string; status: string }[][])
  return (
    <>
      <Status type="todo" data={dataTodo} onTaskMove={handleTaskMove} />
      <Status type="doing" data={dataDoing} onTaskMove={handleTaskMove} />
      <Status type="done" data={dataDone} onTaskMove={handleTaskMove} />
    </>
  )
}
