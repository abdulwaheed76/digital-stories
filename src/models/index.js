"use strict";

const { User } = require("./userSchema");
const { Story } = require("./storySchema");
const { Comment } = require("./commentSchema");
const { Vote } = require("./voteSchema");

module.exports = {
  User,
  Story,
  Comment,
  Vote,
};
