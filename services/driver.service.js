const { Driver } = require("../models");

exports.driverList = async () => {
  let driverList = await Driver.findAll();

  return Promise.resolve(driverList);
};

exports.driverDetail = async (id) => {
  let driver = await Driver.findByPk(id);

  return Promise.resolve(driver);
};

exports.driverCreate = async (id, payload) => {
  let driver = await Driver.create({
    name: payload.name,
    photo: payload.photo,
    simper: payload.simper,
    ktp: payload.ktp,
    phone: payload.phone,
  });

  return Promise.resolve(driver);
};

exports.driverEdit = async (id, payload) => {
  let driver = await Driver.findByPk(id);
  name = payload.name;
  photo = payload.photo;
  simper = payload.simper;
  ktp = payload.ktp;
  phone = payload.phone;

  await driver.save();

  return Promise.resolve(driver);
};
