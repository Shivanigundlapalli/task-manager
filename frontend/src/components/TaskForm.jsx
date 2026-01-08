import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    try {
      await onAdd(title);
      setTitle("");
      setError(null);
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
    }
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <form className="task-form" onSubmit={submit}>
        <input
          className="task-input"
          type="text"
          placeholder="What needs to be done? Add a new task..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(null);
          }}
          autoFocus
        />
        <button className="add-btn" type="submit">+ Add</button>
      </form>
    </>
  );
}

export default TaskForm;
