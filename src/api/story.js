"use strict";

const express = require("express");
const services = require("../services");

const storyRouter = express.Router();

//USER Table
storyRouter.post("/createStory", services.storyServices.createStory);
storyRouter.get('/getStory',services.storyServices.getAllStory);

exports.storyRouter = storyRouter;