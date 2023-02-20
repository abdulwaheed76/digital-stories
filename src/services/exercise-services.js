const status = require("statuses");
const { Exercise } = require("../models");
const config = require("../config");
const mongoose = require("mongoose");

// Admin Routes
// create

const createExercise = async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;

    const exercise = await Exercise.create({
        _id: mongoose.Types.ObjectId(),
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return res.status(201).json(exercise);


}

const retrieveExercise = async (req, res) => {
    const data = await Exercise.find(req.query).exec();
    return res.status(200).json(data);

}
const retrieveExerciseByID = async (req, res) => {
    const { id } = req.params;
    const data = await Exercise.findOne({ _id: id }).exec();
    return res.status(200).json(data);

}

const updateExercise = async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;
    const { id } = req.params;
    Exercise.findOne({ _id: id }, async function (err, Exercise) {
        Exercise.name = name ? name : Exercise.name
        Exercise.reps = reps ? reps : Exercise.reps
        Exercise.weight = weight ? weight : Exercise.weight
        Exercise.unit = unit ? unit : Exercise.unit
        Exercise.date = date ? date : Exercise.date
        Exercise.save(function (err, Exercise) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating Exercise.',
                    error: err
                });
            }

            return res.ststus(200).json(Exercise);
        });
    });
}
const deleteExercise = async (req, res) => {
    const { id } = req.params;
    Exercise.deleteOne({ _id: id }, function (err) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the Exercise.',
                error: err
            });
        }

        return res.status(204).json({ message: "Exercise deleted successfully." });
    });

}

exports.createExercise = createExercise;
exports.retrieveExercise = retrieveExercise;
exports.updateExercise = updateExercise;
exports.deleteExercise = deleteExercise;
exports.retrieveExerciseByID = retrieveExerciseByID;
