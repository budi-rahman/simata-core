"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Checkpoint, { as: "pickup", foreignKey: "pickUpPointId" });
      Task.belongsTo(models.Checkpoint, { as: "delivery", foreignKey: "deliveryPointId" });
      Task.hasMany(models.TaskDetail, { as: "detail", foreignKey: "taskId" });
    }
  }
  Task.init(
    {
      driverId: DataTypes.INTEGER,
      fleetId: DataTypes.INTEGER,
      pickUpPointId: DataTypes.INTEGER,
      deliveryPointId: DataTypes.INTEGER,
      taskDate: DataTypes.DATEONLY,
      awb: DataTypes.STRING,
      deliveryOrderNo: DataTypes.STRING,
      bruto: DataTypes.INTEGER,
      tara: DataTypes.INTEGER,
      netto: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Task",
    },
  );
  return Task;
};
