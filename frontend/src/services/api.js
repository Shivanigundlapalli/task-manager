import axios from "axios";

// Generate or retrieve sessionId for data isolation (no authentication)
const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const API = axios.create({
  baseURL: "https://task-manager-lerp.onrender.com/api/tasks",
});

// Add sessionId to every request header
API.interceptors.request.use((config) => {
  config.headers["X-Session-ID"] = getSessionId();
  return config;
});

// Retry logic for failed requests
const retryRequest = async (config, retries = 1) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await API.request(config);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
};

export const fetchTasks = async () => {
  try {
    return await retryRequest({ method: "GET", url: "/" }, 2);
  } catch (error) {
    throw new Error("Unable to fetch tasks. Please try again.");
  }
};

export const addTask = async (title) => {
  try {
    return await retryRequest(
      { method: "POST", url: "/", data: { title } },
      2
    );
  } catch (error) {
    throw new Error("Unable to add task. Please try again.");
  }
};

export const updateTaskStatus = async (id, completed) => {
  try {
    return await retryRequest(
      { method: "PUT", url: `/${id}`, data: { completed } },
      2
    );
  } catch (error) {
    throw new Error("Unable to update task. Please try again.");
  }
};

export const deleteTask = async (id) => {
  try {
    return await retryRequest({ method: "DELETE", url: `/${id}` }, 2);
  } catch (error) {
    throw new Error("Unable to delete task. Please try again.");
  }
};

