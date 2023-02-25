"use strict";
"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,

    comment: {
      type: String,
      require: true,
    },
    userId: {
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    storyId:{
        type:Schema.Types.ObjectId,
        ref:"Story"
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema, "comment");
exports.Comment = Comment;
