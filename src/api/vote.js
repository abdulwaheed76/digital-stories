"use strict";

const express = require("express");
const services = require("../services");

const voteRouter = express.Router();

//USER Table
voteRouter.post("/vote", services.voteServices.makeVote);
voteRouter.get("/getVote/:id",services.voteServices.getVote)

exports.voteRouter = voteRouter;