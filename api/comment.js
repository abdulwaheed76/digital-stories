"use strict";

const express = require("express");
const services = require("../services");

const commentRouter = express.Router();

//USER Table
commentRouter.post("/makecomment", services.commentServices.createComment);
commentRouter.get('/getcomment/:id',services.commentServices.getCommentsByStoryId)

exports.commentRouter = commentRouter;