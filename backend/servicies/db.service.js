import Category from "../models/category.js";
import User from "../models/user.js";
import Note from "../models/note.js";
//import bcrypt from "bcrypt";

class DatabaseInitializer {
  constructor(db) {
    this.db = db;
    this.user = null;
  }

  async setDefaultUser() {
    try {
      this.user = await User.findOne({ where: { email: "root@hotmail.com" } });

      if (!this.user) {
        this.user = await User.create({
          email: "root@hotmail.com",
          password: "root", //await bcrypt.hash("root", 10),
          status: 0,
        });

        console.log("Default user created");
      } else {
        console.log("Default user already exists in the database.");
      }
    } catch (error) {
      console.error("Error creating default user:", error);
    }
  }

  async setDefaultNotes() {
    try {
      const categories = await Category.findAll();

      if (this.user && categories.length > 0) {
        const notesToCreate = [];

        categories.forEach((category, index) => {
          const noteNumber = index + 1;

          notesToCreate.push({
            title: `Lorem Ipsum ${noteNumber}`,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            status: 0,
            archived: false,
            user_id: this.user.id,
            category_id: category.id,
          });

          notesToCreate.push({
            title: `Lorem Ipsum ${noteNumber + 2}`,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            status: 0,
            archived: true,
            user_id: this.user.id,
            category_id: category.id,
          });
        });

        const existingNotes = await Note.findAll();
        const notesToCreateFiltered = notesToCreate.filter(
          (note) =>
            !existingNotes.some(
              (existingNote) =>
                existingNote.title === note.title &&
                existingNote.user_id === note.user_id
            )
        );

        if (notesToCreateFiltered.length > 0) {
          const createdNotes = await Note.bulkCreate(notesToCreateFiltered, {
            returning: true,
          });

          console.log("Default notes created:", createdNotes);
        } else {
          console.log("Default notes already exist in the database.");
        }
      } else {
        console.error(
          "Error creating default notes: User or categories not found."
        );
      }
    } catch (error) {
      console.error("Error creating default notes:", error);
    }
  }

  async setDefaultCategories() {
    const defaultCategories = [
      { title: "Not Assigned", description: "Not Assingned" },
      { title: "Gym", description: "Fitness-related tasks" },
      { title: "Education", description: "Educational tasks" },
      { title: "Finances", description: "Financial tasks" },
      { title: "Hobbies", description: "Hobby-related tasks" },
      { title: "General", description: "General tasks" },
      { title: "Groceries", description: "Grocery-related tasks" },
    ];

    try {
      const existingCategories = await Category.findAll();
      const categoriesToCreate = defaultCategories.filter(
        (defaultCategory) =>
          !existingCategories.some(
            (existingCategory) =>
              existingCategory.title === defaultCategory.title
          )
      );

      if (categoriesToCreate.length > 0) {
        const createdCategories = await Category.bulkCreate(
          categoriesToCreate,
          { returning: true }
        );

        console.log("Default categories created:", createdCategories);
      } else {
        console.log("Default categories already exist in the database.");
      }
    } catch (error) {
      console.error("Error creating default categories:", error);
    }
  }

  syncDb() {
    this.db
      .sync({ force: false })
      .then(async () => {
        await this.setDefaultUser();
        await this.setDefaultCategories();
        await this.setDefaultNotes();

        console.log("Database and tables synchronized");
      })
      .catch((error) => {
        console.error("Error synchronizing the database:", error);
      });
  }
}

export default DatabaseInitializer;
