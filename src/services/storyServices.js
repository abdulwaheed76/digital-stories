"use strict";
const { Story, User, Vote, Comment } = require("../models");
const mongoose = require("mongoose");

const createStory = async (req, res) => {
  try {
    const { title, imageUrl, description, visibility, postedBy, userId } =
      req.body;
    const story = await Story.create({
      _id: mongoose.Types.ObjectId(),
      title: title,
      description: description,
      visibility: visibility,
      postedby: postedBy,
      userId: userId,
      imageUrl: imageUrl,
    });
    if (story) {
      return res.status(201).json({ message: "Story Created", story });
    }
  } catch (err) {
    console.error(err);
  }
  return res.status(500).json({ message: "Error while creating" });
};
const updateStory = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const storyExist = await Story.findOne({ _id: id });
  if (storyExist) {
    const updateStory = await Story.updateOne(
      { _id: id },
      {
        name: name,
        description: description,
      }
    );
    if (updateStory) {
      return res.status(200).json({ message: "storu updates", updateStory });
    }
    return res.status(500).json({ message: "Error updating story" });
  }
  return res.status(400).json({ message: "Story not found" });
};

const getMyStories = async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await Story.find({ userId: userId }).exec();
    const updatedStories = await Promise.all(
      stories.map(async (story) => {
        const vote = await Vote.find({ storyId: story.id }).exec();
        const countUp = vote.filter((obj) => obj.upVote === true).length;
        const countDown = vote.filter((obj) => obj.downVote === true).length;
        const updateStory = {
          ...story.toObject(),
          upVote: countUp,
          downVote: countDown,
        };
        return updateStory;
      })
    );
    return res.status(200).json(updatedStories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllStory = async (req, res) => {
  try {
    const stories = await Story.find({}).exec();
    const updatedStories = await Promise.all(
      stories.map(async (story) => {
        const vote = await Vote.find({ storyId: story.id }).exec();
        const countUp = vote.filter((obj) => obj.upVote === true).length;
        const countDown = vote.filter((obj) => obj.downVote === true).length;
        const updateStory = {
          ...story.toObject(),
          upVote: countUp,
          downVote: countDown,
        };
        return updateStory;
      })
    );
    return res.status(200).json(updatedStories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findOne({ _id: id }).exec();
    if (story) {
      // const vote = await Vote.find({ storyId: story.id }).exec();
      // const countUp = vote.filter((obj) => obj.upVote === true).length;
      // const countDown = vote.filter((obj) => obj.downVote === true).length;
      const {name} = await User.findById(story.userId).exec();
      // const comment = await Comment.find({ storyId: story.id }).exec();
      console.log(name)
      const updatedStory = {
        ...story.toObject(),
        userName: name,
      };
      return res.status(200).json(updatedStory);
    }
    return res.status(400).json({ message: "Not Found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createStory,
  updateStory,
  getMyStories,
  getAllStory,
  getStoryById,
};
