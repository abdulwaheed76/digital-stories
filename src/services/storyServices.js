const { Story, User } = require("../models");
const mongoose = require("mongoose");

const createStory = async (req, res) => {
  const { title, description,visibility, postedBy, userId } = req.body;

  const story = await Story.create({
    _id: mongoose.Types.ObjectId(),
    title: title,
    description: description,
    visibility:visibility,
    postedby: postedBy,
    userId: userId,
  });
  if (story) {
    return res.status(201).json({ message: "Story Created", story });
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
  const { id } = req.params;
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "user not exist" });
  }
  const stories = await Story.find({ userId: id }).exec();
  return res.status(200).json(stories);
};

const getAllStory = async (req, res) => {
  const stories = await Story.find({}).exec();
  return res.status(200).json(stories);
};

const getStoryById = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findOne({ _id: id }).exec();
  if (story) {
    return res.status(200).json(story);
  }
  return res.status(400).json({ message: "Not Found" });
};
module.exports = {
  createStory,
  updateStory,
  getMyStories,
  getAllStory,
  getStoryById,
};
