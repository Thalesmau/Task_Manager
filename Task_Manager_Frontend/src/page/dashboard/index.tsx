import { useState } from "react";
import type { Column, Task } from "../../types"
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Column as ColumnComponent } from "../../components/Column";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";

const COLUMNS: Column[] = [
  { id: 'TODO', title: 'To do' },
  { id: 'IN_PROGRESS', title: 'In progress' },
  { id: 'DONE', title: 'Done' }
]

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Research Progress',
    description: 'Take out the garbage',
    status: 'TODO'
  },
  {
    id: '2',
    title: 'Research',
    description: 'Watch my favorite show',
    status: 'TODO'
  },
  {
    id: '3',
    title: 'Progress',
    description: 'Charge my phone',
    status: 'IN_PROGRESS'
  },
  {
    id: '4',
    title: 'Testing',
    description: 'Cook dinner',
    status: 'DONE'
  }
]


export function Dashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    setTasks(() => tasks.map(task => task.id === taskId ?
      { ...task, status: newStatus } : task));
  }

  function handleSignOut() {
    signOut();

    navigate('/')
  }

  return (
    <div className='p-8'>
      <nav className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-left text-white'>Kanban Board</h1>

        <button onClick={handleSignOut} className='bg-neutral-600 hover:bg-neutral-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded mt-4'>Logout</button>
      </nav>

      <div className='flex justify-evenly gap-8'>
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return <ColumnComponent
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}>
            </ColumnComponent>
          })}
        </DndContext>
      </div>
    </div>
  )
}