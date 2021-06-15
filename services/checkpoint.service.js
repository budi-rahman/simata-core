const { Checkpoint } = require("../models");

exports.checkpointList = async () => {
  const checkpoints = await Checkpoint.findAll();

  return Promise.resolve(checkpoints);
};

exports.checkpointDetail = async (id) => {
  const checkpoint = await Checkpoint.findByPk(id);

  return Promise.resolve(checkpoint);
};

exports.checkpointCreate = async (payload) => {
  const checkpoint = await Checkpoint.create({
    name: payload.name,
    type: payload.type,
    detail: payload.detail,
  });

  return Promise.resolve(checkpoint);
};

exports.checkpointEdit = async (id, payload) => {
  const checkpoint = await Checkpoint.findByPk(id);
  checkpoint.name = payload.name;
  checkpoint.type = payload.type;
  checkpoint.detail = payload.detail;
  await checkpoint.save();

  return Promise.resolve(checkpoint);
};
