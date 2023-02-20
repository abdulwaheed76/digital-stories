"use strict";

const express = require("express");
const services = require("../services");

const exerciseRouter = express.Router();

//USER Table
exerciseRouter.post("/", services.exerciseService.createExercise);
exerciseRouter.get("/", services.exerciseService.retrieveExercise);
exerciseRouter.get("/:id", services.exerciseService.retrieveExerciseByID);
exerciseRouter.put("/:id", services.exerciseService.updateExercise);
exerciseRouter.delete("/:id", services.exerciseService.deleteExercise);
exports.exerciseRouter = exerciseRouter;
