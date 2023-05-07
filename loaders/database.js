"use strict";

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const config = require("../config");
const dotenvExpand = require("dotenv-expand");

dotenvExpand(dotenv.config());

const connectWithMongoDB = async () => {
  try {
    await mongoose.connect(config.databaseConfig["uri"], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.connectWithMongoDB = connectWithMongoDB;
