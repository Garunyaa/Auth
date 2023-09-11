const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Login_Signup")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("Collection", LoginSchema);

module.exports = collection;
