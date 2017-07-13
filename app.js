const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const controllers = require('./controllers/controllers');
const BasicStrategy = require('passport-http').BasicStrategy;

//models
const User = require('./models/user');
const Activity = require('./models/activity');

const app = express();
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/fitnesstracker');

//middleware
app.use(bodyParser.json());

// app.use(express.session({ secret: 'keyboard cat' }));
// app.use(passport.session());
app.use(passport.initialize());

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({username: username, password: password}).then(user => {
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  }
));

// GET	/activities	Show a list of all activities I am tracking, and links to their individual pages
//WORKS
app.get('/api/activities', passport.authenticate('basic', {session: false}), controllers.activities);

// POST	/activities	Create a new activity for me to track.
//WORKS
app.post('/api/activities', passport.authenticate('basic', {session: false}), controllers.newActivity);

// GET	/activities/{id}	Show information about one activity I am tracking, and give me the data I have recorded for that activity.
//WORKS
app.get('/api/activities/:id', passport.authenticate('basic', {session: false}), controllers.viewActivity);

// PUT	/activities/{id}	Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
//NOTE: USING PATCH here as I do not wish to overwrite the entire document
app.patch('/api/activities/:id', passport.authenticate('basic', {session: false}), controllers.updateActivity);

// DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.
app.delete('/api/activities/:id', passport.authenticate('basic', {session: false}), controllers.deleteActivity);

// POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.(override data would require patch, no??)
app.post('/api/activities/:id/stats', passport.authenticate('basic', {session: false}), controllers.addStats);

// DELETE	/stats/{id}	Remove tracked data for a day.
app.delete('/api/stats/:id', passport.authenticate('basic', {session: false}), controllers.deleteStats);



app.listen(3000);
