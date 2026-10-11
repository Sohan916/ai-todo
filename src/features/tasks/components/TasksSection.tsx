import { useId, useState, type FormEvent, type ReactElement } from "react";
import { useTasks } from "../useTasks";

export function TasksSection(): ReactElement {
  const { tasks, addTask } = useTasks();
  const [draft, setDraft] = useState("");
  const inputId = useId();

  // A form submit covers both clicking Add and pressing Enter in the input.
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    addTask(draft);
    setDraft("");
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor={inputId}>New task</label>
        <input
          id={inputId}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul aria-label="Task list">
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </section>
  );
}
