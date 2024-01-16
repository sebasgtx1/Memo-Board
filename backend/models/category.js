import { DataTypes } from "sequelize";
import db from "../db/db.js";

const Category = db.define(
  "Category",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default Category;
