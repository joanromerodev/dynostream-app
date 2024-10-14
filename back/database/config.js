import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      dbName: "dynostream",
    });
    console.log("Database online");
  } catch (error) {
    throw new Error("Error connecting to the database", error);
  }
};

export default dbConnection;
