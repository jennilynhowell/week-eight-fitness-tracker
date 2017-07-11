const bodyParser = require('body-parser');
const User = require('../models/user');
const Activity = require('../models/activity');

module.exports = {
  activities: (req, res) => {
    console.log(req.user);
    Activity.find({user: req.user._id}).then(activities => {
      res.json(activities);
    });
  },

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


  //end controller
};
