"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();
    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin",
        username: "admin",
        password: bcrypt.hashSync("test123", 10),
        role: "SUPER_ADMIN",
        status: "ACTIVE",
        createdAt: date,
        updatedAt: date,
      },
      {
        name: "Driver 1",
        username: "driver1",
        password: bcrypt.hashSync("test123", 10),
        simper: "SIM-PER-001",
        ktp: "0000000000000001",
        phone: "081234567891",
        role: "DRIVER_USER",
        status: "ACTIVE",
        createdAt: date,
        updatedAt: date,
      },
      {
        name: "Driver 2",
        username: "driver2",
        password: bcrypt.hashSync("test123", 10),
        simper: "SIM-PER-002",
        ktp: "0000000000000002",
        phone: "081234567892",
        role: "DRIVER_USER",
        status: "ACTIVE",
        createdAt: date,
        updatedAt: date,
      },
      {
        name: "Driver 3",
        username: "driver3",
        password: bcrypt.hashSync("test123", 10),
        simper: "SIM-PER-003",
        ktp: "0000000000000003",
        phone: "081234567893",
        role: "DRIVER_USER",
        status: "ACTIVE",
        createdAt: date,
        updatedAt: date,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
