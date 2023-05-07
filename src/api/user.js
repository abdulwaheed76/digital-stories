"use strict";

const express = require("express");
const services = require("../services");

const userRouter = express.Router();

//USER Table
userRouter.post("/register", services.userServices.registerUser);
userRouter.post('/login',services.userServices.loginUser)

exports.userRouter = userRouter;