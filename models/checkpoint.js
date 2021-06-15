"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Checkpoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Checkpoint.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      detail: DataTypes.STRING,
      coordinate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Checkpoint",
    },
  );
  return Checkpoint;
};
