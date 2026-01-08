import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

export const fetchTasks = () => API.get("/");
export const addTask = (title) => API.post("/", { title });

export const updateTaskStatus = (id, completed) =>
  API.put(`/${id}`, { completed });

export const deleteTask = (id) => API.delete(`/${id}`);

