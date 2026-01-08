import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-lerp.onrender.com/api/tasks",
});

export const fetchTasks = () => API.get("/");
export const addTask = (title) => API.post("/", { title });

export const updateTaskStatus = (id, completed) =>
  API.put(`/${id}`, { completed });

export const deleteTask = (id) => API.delete(`/${id}`);

