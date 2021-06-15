"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      driverId: {
        type: Sequelize.INTEGER,
      },
      fleetId: {
        type: Sequelize.INTEGER,
      },
      pickUpPointId: {
        type: Sequelize.INTEGER,
      },
      deliveryPointId: {
        type: Sequelize.INTEGER,
      },
      taskDate: {
        type: Sequelize.DATEONLY,
      },
      awb: {
        type: Sequelize.STRING,
      },
      deliveryOrderNo: {
        type: Sequelize.STRING,
      },
      bruto: {
        type: Sequelize.INTEGER,
      },
      tara: {
        type: Sequelize.INTEGER,
      },
      netto: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tasks");
  },
};
