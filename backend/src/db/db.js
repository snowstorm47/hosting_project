const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL ||
        "mongodb://localhost:27017/test"
    );
  } catch (e) {
    console.log("database connection failed");
  }
};

module.exports.connect = connect;
