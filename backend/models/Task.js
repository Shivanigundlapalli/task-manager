import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
    sessionId: {
      type: String,
      required: true,
      index: true
    }
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("Task", taskSchema);
