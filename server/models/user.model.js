const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide name"],
  },
  email: {
    type: String,
    required: [true, "provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "provide password"],
    minlength: 8,
  },
  profile_pic: {
    type: String,
    default: "",
  },
},{
    timestamps: true,
});

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;