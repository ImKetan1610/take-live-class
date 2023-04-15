const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const connect = mongoose.connect(
      "mongodb+srv://Ketan:Ketan1610@cluster0.rwvk47z.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  console.log("Database Connected Successfully.");
};

module.exports = dbConnect;
