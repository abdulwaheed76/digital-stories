"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = new Schema(
  {
    _id: Schema.Types.ObjectId,

    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema, "story");
exports.Story = Story;
