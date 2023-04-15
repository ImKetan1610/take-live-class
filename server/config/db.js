const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const connect = mongoose.connect(process.env.URL);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  console.log("Database Connected Successfully.");
};

module.exports = dbConnect;
