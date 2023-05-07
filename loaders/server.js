"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const api = require("../api");
const { connectWithMongoDB } = require("./database");

const initializeServer = (serverPort) => {
  const backend = express();
  var whitelist = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "https://digital-story-client.vercel.app"
  ];
  var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = {
        origin: true,
        credentials: true,
        exposedHeaders: ["set-cookie"],
      }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };
  backend.use(cors(corsOptionsDelegate));
  backend.use(bodyParser.json({ limit: "50mb" }));
  backend.use("/api/auth", api.user.userRouter);
  backend.use("/api/story", api.story.storyRouter);
  backend.use("/api/vote", api.vote.voteRouter);
  backend.use("/api/comment", api.commnet.commentRouter);
  connectWithMongoDB()
    .then(() => {
      backend.listen(serverPort);
      console.log("Server started listening on port", serverPort);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.initializeServer = initializeServer;
