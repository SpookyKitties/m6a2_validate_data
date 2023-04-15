import express from "express";
import mongoose from "mongoose";
import bankAccountRoutes from "./routes/bankAccountRoutes";
import methodOverride from "method-override";

(async function () {
  const app = express();

  // Connect to MongoDB database using Mongoose
  await mongoose.connect(
    "mongodb+srv://tempAccount:Hr5UjgvOrA0hxUSo@jpasuift458.ibk5shr.mongodb.net/bank-accounts",
    {}
  );
  console.log("Connected to MongoDB database");

  // Configure middleware
  app.set("view engine", "pug");
  app.set("views", "src/views");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(methodOverride("_method"));

  // Configure routes
  app.use("/bankAccounts", bankAccountRoutes);

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})();
