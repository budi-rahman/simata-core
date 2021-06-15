"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fleet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fleet.init(
    {
      type: DataTypes.STRING,
      licensePlate: DataTypes.STRING,
      gatePass: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Fleet",
    },
  );
  return Fleet;
};
