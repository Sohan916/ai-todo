import { useState } from "react";
import type { Task } from "./types";

export type UseTasksResult = {
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
};

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(title: string): void {
    const trimmed = title.trim();
    if (trimmed === "") return;
    setTasks((current) => [...current, { id: crypto.randomUUID(), title: trimmed }]);
  }

  function removeTask(id: string): void {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return { tasks, addTask, removeTask };
}
