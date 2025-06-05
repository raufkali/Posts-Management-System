const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);

    if (!connect) {
      console.error("MONGO-DB Connection Error!");
      process.exit(1);
    }

    console.log(
      `[+] Database Successfully Connected to: ${connect.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
