import style from './App.module.css'
import { useGetTasksQuery } from './services/tasks'
import Board from './components/Board'


function App() {

  const { data: tasks = [] } = useGetTasksQuery({})
  // console.log('tasks', tasks)

  return (
    <div className={style.container}>
      <Board data={tasks} />
    </div>
  )
}

export default App
