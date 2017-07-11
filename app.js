const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

//models
const User = require('./models/user');
const Activity = require('./models/activity');

const app = express();
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/fitnesstracker');

// passport.use(new BasicStrategy(
//   function(username, password, done) {
//     User.findOne({username: username, password: password}).then(user =>{
//       if(!user || !password){
//         return done(null, false);
//       }
//       return done(null, user); //user object (id, un, pw)
//     });
//   };
// ));

// GET	/activities	Show a list of all activities I am tracking, and links to their individual pages
// POST	/activities	Create a new activity for me to track.
// GET	/activities/{id}	Show information about one activity I am tracking, and give me the data I have recorded for that activity.
// PUT	/activities/{id}	Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
// DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.
// POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.
// DELETE	/stats/{id}	Remove tracked data for a day.






app.listen(3000);
