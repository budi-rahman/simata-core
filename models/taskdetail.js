"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaskDetail.init(
    {
      taskId: DataTypes.INTEGER,
      coordinate: DataTypes.STRING,
      type: DataTypes.STRING,
      photo: DataTypes.STRING,
      remark: DataTypes.STRING,
      order: DataTypes.INTEGER,
      finishedAt: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TaskDetail",
    },
  );
  return TaskDetail;
};
