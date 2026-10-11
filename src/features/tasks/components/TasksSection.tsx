import { useId, useRef, useState, type FormEvent, type ReactElement } from "react";
import { useTasks } from "../useTasks";

export function TasksSection(): ReactElement {
  const { tasks, addTask, removeTask } = useTasks();
  const [draft, setDraft] = useState("");
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // A form submit covers both clicking Add and pressing Enter in the input.
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    addTask(draft);
    setDraft("");
  }

  // The removed task's button disappears, so send focus somewhere predictable.
  function handleRemove(id: string): void {
    removeTask(id);
    inputRef.current?.focus();
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor={inputId}>New task</label>
        <input
          id={inputId}
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul aria-label="Task list">
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button
              type="button"
              aria-label={`Remove ${task.title}`}
              onClick={() => handleRemove(task.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
