const mongoose = require("mongoose");
const { Comment } = require("../models");

const createComment = async (req, res) => {
  try {
    const { comment, userId, storyId } = req.body;
console.log(comment, userId, storyId)
    const addComment = await Comment.create({
      _id: mongoose.Types.ObjectId(),
      comment: comment,
      // userId: userId,
      storyId: storyId,
    });

    return res.status(201).json(addComment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getCommentsByStoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ storyId: id })
      .populate("userId")
      .exec();
    return res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createComment,
  getCommentsByStoryId,
};
