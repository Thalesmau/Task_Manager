import { useEffect, useState } from "react";
import type { Column, Task } from "../../types"
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Column as ColumnComponent } from "../../components/Column";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";

const COLUMNS: Column[] = [
  { id: 'TODO', title: 'To do' },
  { id: 'IN_PROGRESS', title: 'In progress' },
  { id: 'DONE', title: 'Done' }
]

export function Dashboard() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get<Task[]>(`TaskCard/User/${user?.token.user?.id}`);

        setTasks(response.data);

      } catch {
        console.error("Error fetching tasks:");
      }
    }

    fetchTasks();
  }, [user?.token.user?.id])

  const handleAddTask = async (newTask: Omit<Task, "id">) => {
    try {
      const response = await api.post<Task>('TaskCard', newTask);

      setTasks([...tasks, response.data]);
    } catch {
      console.error("Error adding task:");
    }
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    try {
      api.put(`/TaskCard/UpdateStatusTask/${taskId}`, { status: newStatus });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch {
      console.error("Error moving task:");
    }

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
              tasks={tasks.filter((task) => task.status === column.id)}
              onAddTask={handleAddTask}
            >
            </ColumnComponent>
          })}
        </DndContext>
      </div>
    </div>
  )
}