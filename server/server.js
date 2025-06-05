//// dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/authMiddleware");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

// database connection function
connectDB();

//// middlewares
// built-ins
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
//my middlewares
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postsRoutes"));

app.use(errorHandler);

//// server
app.listen(port, () => {
  console.log("Server started on PORT: ", port);
});
