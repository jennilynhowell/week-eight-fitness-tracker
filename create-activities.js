const mongoose = require('mongoose');
const Activity = require('./models/activity');
mongoose.connect('mongodb://localhost:27017/fitnesstracker');

let act1 = new Activity({
  name: 'Running',
  user: '59641738ce313c152f6d61d5',
  stats: {
    day: new Date(2017, 6, 6),
    number: 3,
    units: 'miles'
  }
});

let act2 = new Activity({
  name: 'Fitness Video',
  user: '59641738ce313c152f6d61d5',
  stats: {
    day: new Date(2017, 6, 9),
    number: 30,
    units: 'minutes'
  }
});

let act3 = new Activity({
  name: 'Playing Ball',
  user: '59641738ce313c152f6d61d6',
  stats: {
    day: new Date(),
    number: 10,
    units: 'minutes'
  }
});

act1.save();
act2.save();
act3.save();
