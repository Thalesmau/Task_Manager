import { useDroppable } from "@dnd-kit/core"
import type { Column, Task } from "../types"
import { TaskCard } from "./TaskCard"
import { useState } from "react"

type ColumnProps = {
  column: Column
  tasks: Task[]
  onAddTask: (task: Omit<Task, "id">) => Promise<void>
  userId: number | undefined
}

export function Column({ column, tasks, onAddTask, userId }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !newTaskDescription.trim() || !userId) {
      return;
    }

    setIsLoading(true);

    try {
      await onAddTask({
        title: newTaskTitle,
        description: newTaskDescription,
        status: column.id,
        userId: userId
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setIsTaskFormVisible(false);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-auto w-80 flex-col rounded-lg bg-neutral-800 p-4'>
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />
        })}
      </div>

      <button
        onClick={() => setIsTaskFormVisible(true)}
        className="mt-4 bg-neutral-600 hover:bg-neutral-700 hover:cursor-pointer text-sm text-white font-bold py-2 px-4 rounded"
      >
        Add Task
      </button>

      {isTaskFormVisible && (
        <div className="mt-4 p-4 bg-neutral-700 rounded">
          <h3 className="text-lg font-bold mb-2 text-neutral-100">New Task</h3>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1 text-neutral-100">Title</label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-2 rounded bg-neutral-600 text-neutral-100"
              placeholder="Task title"
              disabled={isLoading}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1 text-neutral-100">Description</label>
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="w-full p-2 rounded bg-neutral-600 text-neutral-100"
              placeholder="Task description"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsTaskFormVisible(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}