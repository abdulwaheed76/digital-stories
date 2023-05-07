"use strict";

const { initializeServer } = require("./loaders");
const dotenv = require("dotenv");
const config = require("./config");
const dotenvExpand = require("dotenv-expand");

dotenvExpand(dotenv.config());
initializeServer(config.serverConfig.port || 3000);
