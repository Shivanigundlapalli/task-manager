import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  fetchTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
} from "../services/api";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const res = await fetchTasks();
        setTasks(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleAdd = async (title) => {
    try {
      const res = await addTask(title);
      setTasks((prev) => [res.data, ...prev]);
      setError(null);
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
    }
  };

  const handleStatusChange = async (id, completed) => {
    try {
      const res = await updateTaskStatus(id, completed);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) =>
          filter === "completed" ? t.completed : !t.completed
        );

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Task Manager</h1>
        </div>

        {error && <div className="error">{error}</div>}

        <TaskForm onAdd={handleAdd} />

        <div className="filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
