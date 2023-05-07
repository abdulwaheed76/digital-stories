"use strict";

const express = require("express");
const services = require("../services");

const voteRouter = express.Router();

//USER Table
voteRouter.post("/makevote", services.voteServices.makeVote);
voteRouter.get("/getVote/:id/:userId",services.voteServices.getVote)

exports.voteRouter = voteRouter;