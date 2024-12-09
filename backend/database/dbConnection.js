import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "project",
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log("Error occured while connecting to database");
    });
};

