const mongoose = require("mongoose");
const { Comment } = require("../models");

const createComment = async (req, res) => {
  const { comment, userId, storyId } = req.body;

  const addComment = await Comment.create({
    _id: mongoose.Types.ObjectId(),
    comment: comment,
    userId: userId,
    storyId: storyId,
  });

  return res.status(201).json(addComment);
};

module.exports={
    createComment,
}