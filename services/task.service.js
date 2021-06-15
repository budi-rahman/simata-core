const moment = require("moment");
const { Task, TaskDetail, Checkpoint } = require("../models");

exports.taskList = async (user) => {
  let tasks = await Task.findAll({
    where: { driverId: user.id },
    limit: 20,
    order: [["taskDate", "DESC"]],
    include: [
      { model: Checkpoint, as: "pickup", attributes: ["name"] },
      { model: Checkpoint, as: "delivery", attributes: ["name"] },
    ],
  });

  return Promise.resolve(tasks);
};

exports.taskDetail = async (id) => {
  let task = await Task.findByPk(id, {
    include: [
      { model: Checkpoint, as: "pickup" },
      { model: Checkpoint, as: "delivery" },
      { model: TaskDetail, as: "detail" },
    ],
    order: [["detail", "order", "ASC"]],
  });

  return Promise.resolve(task);
};

exports.taskCreate = async (payload) => {
  const ts = moment();
  let task = await Task.create({
    ...payload,
    status: "ACTIVE",
  });

  await TaskDetail.bulkCreate(
    ["departure", "taking-item", "checkpoint-item", "delivery-item", "arrival"].map((d, idx) => ({
      taskId: task.id,
      type: d,
      order: idx + 1,
      createdAt: ts.format(),
      updatedAt: ts.format(),
      status: "ACTIVE",
    })),
  );
  return Promise.resolve(task);
};

exports.taskEdit = async (id, payload) => {
  let task = await Task.findByPk(id);
  task.driverId = payload.driverId;
  task.fleetId = payload.fleetId;
  task.pickUpPointId = payload.pickUpPointId;
  task.deliveryPointId = payload.deliveryPointId;
  task.awb = payload.awb;
  task = await task.save();

  return Promise.resolve(task);
};

exports.taskUpdate = async (taskId, taskDetailId, payload, fileUrl) => {
  let task = await Task.findByPk(taskId);
  let taskDetail = await TaskDetail.findByPk(taskDetailId);

  /**
   * departure -
   * taking-item - deliveryOrderNo, photo, remark
   * checkpoint-item -
   * delivery-item - netto, bruto, tara, photo, remark
   * arrival -
   */

  if (taskDetail.type === "arrival") {
    console.log(taskDetail.type);
    task.status = "FINISHED";
  } else {
    task.activeTask = task.activeTask + 1;
    if (taskDetail.type === "taking-item") {
      task.deliveryOrderNo = payload.deliveryOrderNo;
      taskDetail.photo = fileUrl;
    } else if (taskDetail.type === "delivery-item") {
      task.bruto = payload.bruto;
      task.tara = payload.tara;
      task.netto = Number(payload.bruto) - Number(payload.tara);
      taskDetail.photo = fileUrl;
    }
  }

  taskDetail.coordinate = payload.coordinate;
  taskDetail.remark = payload.remark;
  taskDetail.finishedAt = payload.finishedAt || taskDetail.finishedAt || new Date();
  taskDetail.status = "FINISHED";

  await task.save();
  await taskDetail.save();

  return Promise.resolve({ task, taskDetail });
};
