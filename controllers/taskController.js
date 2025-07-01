import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, fromTime, toTime } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      fromTime,
      toTime,
      createdBy: req.user._id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ createdBy: userId });

    const counts = {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'To Do').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      completed: tasks.filter(t => t.status === 'Done').length,
    };

    res.json({ tasks, counts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = req.body.status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
