"use strict";

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

dotenvExpand(dotenv.config());

const { PORT, DATABASE_URI, AUTH_SECRET } = process.env;

const serverConfig = {
  port: PORT,
};

const databaseConfig = {
  uri: DATABASE_URI,
};

const authConfig = {
  AUTH_SECRET: AUTH_SECRET || "secret",
};

exports.serverConfig = serverConfig;
exports.databaseConfig = databaseConfig;
exports.authConfig = authConfig;
