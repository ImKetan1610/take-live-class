const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { generateToken } = require("../config/jwtToken");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    // create new user
    const newUser = await User.create(req.body);
    return res.status(200).send(newUser);
  } else {
    // user already exist
    throw new Error("User already exist");
  }
});

const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMathched(password))) {
    return res.send({
      _id: findUser?._id,
      username: findUser?.username,
      email: findUser?.email,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});



const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).send(allUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createUser, loginUserController, getAllUsers };
