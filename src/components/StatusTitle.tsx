import style from './StatusTitle.module.css'

const getTitle = (type?: string) => {
  if (type === 'todo') return (<>
    <span className={style.title}>To Do </span>
    <span className="material-symbols-outlined">
      emoji_objects
    </span>
  </>)
  if (type === 'doing') return (
    <>
      <span className={style.title}>Doing </span>
      <span className="material-symbols-outlined">
        construction
      </span>
    </>)
  if (type === 'done') return (<>
    <span className={style.title}>Done </span>
    <span className="material-symbols-outlined">
      done
    </span>
  </>)
  return type
}

export default function StatusTitle({ type }: { type?: string }) {
  return (
    <h2 className={style.root}>{getTitle(type)}</h2>
  )
}
