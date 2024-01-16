import { DataTypes } from "sequelize";
import db from "../db/db.js";
import User from "./user.js";
import Category from "./category.js";

const Note = db.define(
  "Note",
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
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Category,
        key: "id",
      },
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

Note.belongsTo(User, { foreignKey: "user_id" });
Note.belongsTo(Category, { foreignKey: "category_id" });
export default Note;
