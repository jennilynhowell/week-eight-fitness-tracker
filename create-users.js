const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect('mongodb://localhost:27017/fitnesstracker');

let user1 = new User({
  username: 'Jennilyn',
  password: 'puppies'
});

let user2 = new User({
  username: 'Luke',
  password: 'ball'
});

user1.save();
user2.save();
