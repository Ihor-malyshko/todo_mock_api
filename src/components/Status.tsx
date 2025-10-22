import { DragEvent } from 'react'
import style from './Status.module.css'
import Task from './Task'
import StatusTitle from './StatusTitle'
import AddButton from './AddButton'

export default function Status({
  type,
  data,
  onTaskMove
}: {
  type?: string
  data?: { id: number; title: string }[]
  onTaskMove?: (taskId: number, newStatus: string) => void
}) {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const taskId = parseInt(e.dataTransfer.getData('text/plain'))
    if (taskId && type && onTaskMove) {
      onTaskMove(taskId, type)
    }

    e.currentTarget.classList.remove(style.dragOver)
  }

  return (
    <div
      className={style.card}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <StatusTitle type={type} />
      <div className={style.tasks}>
        {data?.map(task => (
          <Task key={task.id} text={task.title} id={task.id} />
        ))}
      </div>
      <AddButton type={type} />
    </div>
  )
}
