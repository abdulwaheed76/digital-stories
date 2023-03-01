const mongoose = require("mongoose");
const { Vote } = require("../models");

const makeVote = async (req, res) => {
  const { storyId, userId, upVote, downVote } = req.body;
  const vote = await Vote.findOne({ storyId: storyId, userId: userId }).exec();
  if (!vote) {
    const mVote = await Vote.create({
      _id: mongoose.Types.ObjectId(),
      userId: userId,
      storyId: storyId,
      upVote: upVote,
      downVote: downVote,
    });
    return res.status(200).json(mVote);
  } else {
    let update = { upVote: false, downVote: false };
    if (vote.upVote && !upVote) {
      update.upVote = false;
    }
    if (!vote.upVote && upVote) {
      update.upVote = true;
    }
    if (vote.downVote && !downVote) {
      update.downVote = false;
    }

    if (!vote.downVote && downVote) {
      update.downVote = true;
    }
    if (vote.upVote && downVote) {
      update.upVote = false;
      update.downVote = true;
    }
    if (vote.downVote && upVote) {
      update.downVote = false;
      update.upVote = true;
    } 
    const mVote = await Vote.updateOne({ _id: vote._id }, update);
    return res.status(200).json(mVote);
  }
};

const getVote = async (req, res) => {
  const { id, userId } = req.params;
  const vote = await Vote.find({ storyId: id }).exec();
  const countUp = vote.filter((obj) => obj.upVote === true).length;
  const countDown = vote.filter((obj) => obj.downVote === true).length;
  const userVote = vote.filter((obj) => obj.userId.equals(userId));
  const updateVote = {
    upVote: countUp,
    downVote: countDown,
    userVote: userVote,
  };
  return res.status(200).json(updateVote);
};
module.exports = {
  makeVote,
  getVote,
};
