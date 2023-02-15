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
    postedBy: {
      type: String,
    },
    vote: {
      type: Number,
    },
    upVote: {
      type: Number,
    },
    downVote: {
      type: Number,
    },
    commentId: 
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema, "story");
exports.Story = Story;
