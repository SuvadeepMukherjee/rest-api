const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();
app.use(bodyParser.json());

//import Routes
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

//Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

//connect to db and start servr
const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Connected to DB");

    // Start the server after successful DB connection
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error.message);
    process.exit(1); // Exit the application if DB connection fails
  }
};

startServer();
