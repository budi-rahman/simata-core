"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ts = new Date();
    await queryInterface.bulkInsert("Checkpoints", [
      {
        name: "Basecamp 1",
        type: "Basecamp",
        detail: "PT Berau Coal Basecamp",
        coordinate: "6.22222|6.11111",
        createdAt: ts,
        updatedAt: ts,
      },
      {
        name: "Quary 1",
        type: "Quary",
        detail: "PT Berau Coal Quary",
        coordinate: "6.22222|6.11111",
        createdAt: ts,
        updatedAt: ts,
      },
      {
        name: "Checkpoint Quary 1",
        type: "Checkpoint Quary",
        detail: "PT Berau Coal Quary",
        coordinate: "6.22222|6.11111",
        createdAt: ts,
        updatedAt: ts,
      },
      {
        name: "Quary 2",
        type: "Quary",
        detail: "PT Berau Coal END Quary",
        coordinate: "6.22222|6.11111",
        createdAt: ts,
        updatedAt: ts,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Checkpoints", null, {});
  },
};
