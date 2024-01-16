import db from "../db/db.js";
import { DataTypes } from "sequelize";

const User = db.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
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

export default User;
