const { Fleet } = require("../models");

exports.fleetList = async (query) => {
  const fleet = await Fleet.findAll();

  return Promise.resolve(fleet);
}

exports.fleetDetail = async (id) => {
  const fleet = await Fleet.findByPk(id);

  return Promise.resolve(fleet);
}

exports.fleetCreate = async (payload) => {
  const fleet = await Fleet.create({
    type: payload.type,
    licensePlate: payload.licensePlate,
    gatePass: payload.gatePass
  });

  return Promise.resolve(fleet);
}

exports.fleetEdit = (id, payload) => {
  let fleet = await Fleet.findByPk(id);
  fleet.type = payload.type;
  fleet.licensePlate = payload.licensePlate;
  fleet.gatePass = payload.gatePass;
  fleet = await fleet.save();

  return Promise.resolve(fleet);
}