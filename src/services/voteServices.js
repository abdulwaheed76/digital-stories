const mongoose = require("mongoose");
const { Vote } = require("../models");

const makeVote = async (req, res) => {
  const { storyId, userId, upVote, downVote, up, down } = req.body;
  const vote = await Vote.findOne({ storyId: storyId, userId: userId });

  if (vote) {  
            
  }
};
