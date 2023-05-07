"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,

    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    stories: {
      type: Schema.Types.ObjectId,
      ref: "Story",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");
exports.User = User;
