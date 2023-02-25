const mongoose = require("mongoose");
const { Vote } = require("../models");

const makeVote = async (req, res) => {
  const { storyId, userId, upVote, downVote, up, down } = req.body;
  const vote = await Vote.findOne({ storyId: storyId, userId: userId }).exec();
  console.log(vote);
  if (!vote) {
    const mVote = await Vote.create({
      _id: mongoose.Types.ObjectId(),
      userId: userId,
      storyId: storyId,
      upVote: upVote && true,
      downVote: downVote && true,
    });
    return res.status(200).json(mVote);
  } else {
    if (vote.upVote && !up) {
      await Vote.findOneAndUpdate(
        { storyId: storyId, userId: userId },
        {
          upVote: false,
        }
      );
    }
    if (vote.downVote && !down) {
      await Vote.findOneAndUpdate(
        { storyId: storyId, userId: userId },
        {
          downVote: false,
        }
      );
    }
    if (vote.upVote && down) {
      await Vote.findOneAndUpdate(
        { storyId: storyId, userId: userId },
        {
          downVote: true,
        }
      );
    }
    if (vote.downVote && up) {
      await Vote.findOneAndUpdate(
        { storyId: storyId, userId: userId },
        {
          upVote: true,
        }
      );
    }
  }
};

const getVote = async (req, res) => {
  const { id ,userId} = req.param;
  const vote = await Vote.find({ storyId: id }).exec();
  const countUp = vote.filter((obj) => obj.upVote === true).length;
  const countDown = vote.filter((obj) => obj.downVote === true).length;
  const userVote = vote.filter((obj)=>obj.userId === userId);
  const updateVote = {
    upVote: countUp,
    downVote: countDown,
    userVote :userVote,
  };
  return res.status(200).json(updateVote);
};
module.exports = {
  makeVote,
  getVote,
};
