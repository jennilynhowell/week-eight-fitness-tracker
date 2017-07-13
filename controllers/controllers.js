const bodyParser = require('body-parser');
const User = require('../models/user');
const Activity = require('../models/activity');

module.exports = {
  //Show a list of all activities I am tracking
  activities: (req, res) => {
    Activity.find({user: req.user._id}).then(activities => {
      res.json(activities);
    });
  },

  //Create a new activity for me to track.
  newActivity: (req, res) => {
    let name = req.body.name
      , user = req.user._id
      , day = req.body.day
      , number = req.body.number
      , units = req.body.units;

    let newWorkout = {
      name: name,
      user: user,
      stats: {
        day: day,
        number: number,
        units: units
      }
    };

    let newWk = new Activity(newWorkout).save().then((_newWorkout) => {
      res.json(_newWorkout)
    });
  },

  //Show information about one activity I am tracking
  viewActivity: (req, res) => {
    let _id = req.params.id;
    Activity.findById(_id).then(activity => {
      res.json(activity);
    });
  },

  //Delete one activity I am tracking.
  deleteActivity: (req, res) => {
    let _id = req.params.id;
    Activity.remove({_id: _id}).then(() => {
      res.json({message: 'Activity removed successfully'});
    }
    );
  },

  //Update activity name without removing its stats
  updateActivity: (req, res) => {
    let _id = req.params.id
      , name = req.body.name;
    Activity.findById(_id).then(activity => {
      activity.name = name;
      activity.save();
      res.json(activity);
    });
  },

  //add stats to an activity
  addStats: (req, res) => {
    let _id = req.params.id
      , day = req.body.day
      , number = req.body.number
      , units = req.body.units;

    Activity.findById(_id).then(activity => {
      activity.stats.push({
        day: day,
        number: number,
        units: units
      });
      activity.save();
      res.json(activity);
    });
  },

  //remove set of stats
  //help with this at https://stackoverflow.com/questions/31105057/trying-to-remove-a-nested-object-in-mongoose
  deleteStats: (req, res) => {
    let _id = req.params.id
      , statId = req.body.statId;

    Activity.update({_id: _id}, {
      $pull: {stats: {_id: statId}},
    }).then(activity => {
      res.json(activity);
    });
  }

  //end controller
};
