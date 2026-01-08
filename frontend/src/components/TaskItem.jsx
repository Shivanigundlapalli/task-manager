function TaskItem({ task, onStatusChange, onDelete }) {
  return (
    <div
      className={`task-item ${task.completed ? "completed" : "pending"}`}
    >
      <span className="task-title">{task.title}</span>

      <div className="task-actions">
        <select
          className={`status-select ${
            task.completed ? "status-completed" : "status-pending"
          }`}
          value={task.completed ? "completed" : "pending"}
          onChange={(e) =>
            onStatusChange(task._id, e.target.value === "completed")
          }
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
