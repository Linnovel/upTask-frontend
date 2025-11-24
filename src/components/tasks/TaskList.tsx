import type { Task } from "@/types"
import React from "react"
import TaskCard from "./TaskCard"
import { statusColors, statusTrasnlations } from "@/locales/es"

interface TaskListProps {
  tasks: Task[]
  canEdit: boolean
}

type GroupTask = {
  [key: string]: Task[]
}

const initialStatusGroups: GroupTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
}

function TaskList({ tasks, canEdit }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : []
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup }
  }, initialStatusGroups)

  return (
    <React.Fragment>
      <h2 className="text-5xl font-black my-10">Tareas</h2>
      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 rounded-sm">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            {/* //Búsqueda Dinámica (Indexación con Corchetes) */}
            <h3
              className={`capitalize text-xl font-light border border-t-8 bg-white p-3 ${statusColors[status]}`}
            >
              {statusTrasnlations[status]}
            </h3>
            <ul className="mt-5 space-y-5 rounded-sm">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => (
                  <TaskCard canEdit={canEdit} key={task._id} task={task} />
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default TaskList
