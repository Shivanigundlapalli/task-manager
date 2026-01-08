import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onStatusChange, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks found</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
