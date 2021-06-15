const taskService = require("../services/task.service");

exports.taskList = async (req, res) => {
  const tasks = await taskService.taskList(req.user);

  res.json(tasks);
};

exports.taskDetail = async (req, res) => {
  const task = await taskService.taskDetail(req.params.id);

  res.json(task);
};

exports.taskCreate = async (req, res) => {
  const task = await taskService.taskCreate(req.body);

  res.json(task);
};

exports.taskDetailUpdate = async (req, res) => {
  let fileUrl = null;
  if (req.file) {
    fileUrl = req.file.path;
  }
  const { task, taskDetail } = await taskService.taskUpdate(req.params.id, req.params.taskDetailId, req.body, fileUrl);

  res.json({ task, taskDetail });
};
