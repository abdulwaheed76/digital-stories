"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const voteSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,

    storyId: {
      type: Schema.Types.ObjectId,
      ref:"Story"
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    upVote: {
      type: Number,
    },
    downVote: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model("Vote", voteSchema, "vote");
exports.Vote = Vote;
