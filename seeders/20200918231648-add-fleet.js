"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ts = new Date();
    await queryInterface.bulkInsert("Fleets", [
      {
        type: "Truck A",
        licensePlate: "B1A",
        gatePass: "GP-B1A",
        createdAt: ts,
        updatedAt: ts,
      },
      {
        type: "Truck A",
        licensePlate: "B2A",
        gatePass: "GP-B2A",
        createdAt: ts,
        updatedAt: ts,
      },
      {
        type: "Truck A",
        licensePlate: "B3A",
        gatePass: "GP-B3A",
        createdAt: ts,
        updatedAt: ts,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Fleets", null, {});
  },
};
