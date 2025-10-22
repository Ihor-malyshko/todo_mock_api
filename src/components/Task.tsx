import { DragEvent } from 'react'
import style from './Task.module.css'
import DeleteButton from './DeleteButton'

export default function Task({ text, id }: { text?: string, id?: number }) {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', id?.toString() || '')
    e.dataTransfer.effectAllowed = 'move'
  }


  return (
    <div
      className={style.root}
      data-id={id}
      draggable={true}
      onDragStart={handleDragStart}
    >
      <p>{text}</p>
      <p>id: {id}</p>
      <DeleteButton id={id || 0} />
    </div>
  )
}
