import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true,
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});


const Task = mongoose.model('Task', taskSchema);
export default Task;