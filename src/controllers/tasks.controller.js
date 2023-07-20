import Task from "../models/tasks.models.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id
    }).populate('user');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskByName = async (req, res) => {
  try {
    await Task.findOne({
      title: String,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const taskFound = await Task.findById(id);
    if (!taskFound) return res.status(404).json({ message: "task not found" });
    res.json(taskFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskFound = await Task.findByIdAndDelete(id);
    if (!taskFound) return res.status(404).json({ message: "task not found" });
    return res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    const taskFound = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
      },
      { new: true }
    );
    if (!taskFound) return res.status(404).json({ message: "task not found" });
    res.json(taskFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id
    });

    const savedTask = await newTask.save();

    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
