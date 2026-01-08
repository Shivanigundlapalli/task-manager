import Task from "../models/Task.js";

// GET all tasks for current session
export const getTasks = async (req, res) => {
  try {
    const sessionId = req.headers["x-session-id"];
    
    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const tasks = await Task.find({ sessionId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// CREATE task for current session
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const sessionId = req.headers["x-session-id"];

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await Task.create({
      title,
      completed: false,
      sessionId,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// UPDATE task (verify ownership by sessionId)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const sessionId = req.headers["x-session-id"];

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Verify ownership
    if (task.sessionId !== sessionId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json(task);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// DELETE task (verify ownership by sessionId)
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const sessionId = req.headers["x-session-id"];

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Verify ownership
    if (task.sessionId !== sessionId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
