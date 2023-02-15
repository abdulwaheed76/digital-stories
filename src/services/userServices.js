const { User } = require("../models");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExit = await User.findOne({ email: email });
  if (userExit) {
    return res.status(400).json({ message: "User already exist" });
  }
  console.log(req.body);
  const encrypterPass = await bcrypt.hash(password, 10);
  const user = await User.create({
    _id: mongoose.Types.ObjectId(),
    name: name,
    email: email,
    password: encrypterPass,
  });
  const token = jwt.sign(
    {
      user_id: user._id,
      email,
    },
    config.authConfig.AUTH_SECRET,
    { expiresIn: "15m" }
  );
  user.token = token;
  return res.status(201).json({ user, token });
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  const user = await User.findOne({ email: email }).exec();
  console.log(user);
  if (!user) {
    res.status(401).json({
      message: "Login not successful",
      error: "User not found",
    });
  }
  const result = await bcrypt.compare(password, user.password);
  if (result) {
    const payload = {
      user_id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, config.authConfig.AUTH_SECRET, {
      expiresIn: "15m",
    });
    const userLoged = {
      name: user.name,
      email: user.email,
      token: token,
    };
    return res.status(200).json({
      message: "Login successful",
      userLoged,
    });
  }

  return res.status(400).json({ message: "Login not succesful" });
};
module.exports = {
  registerUser,
  loginUser,
};
