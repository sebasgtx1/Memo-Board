import { Sequelize } from "sequelize";
import retry from "retry";

const connectToDatabase = async () => {
  const operation = retry.operation({
    retries: 10,
    factor: 3,
    minTimeout: 5000,
  });

  return new Promise((resolve, reject) => {
    operation.attempt(async (currentAttempt) => {
      try {
        const db = new Sequelize("notesdb", "root", "root", {
          host: "mysqldb",
          port: "3306",
          dialect: "mysql",
        });

        await db.authenticate();

        console.log("Connection to the database established successfully.");
        resolve(db);
      } catch (error) {
        if (operation.retry(error)) {
          console.error(
            `Attempt ${currentAttempt}: Error connecting to the database. Retrying...`
          );
          return;
        }
        console.error(
          "Maximum number of attempts exceeded. Unable to connect to the database."
        );
        reject(error);
      }
    });
  });
};

const db = await connectToDatabase();

export default db;
