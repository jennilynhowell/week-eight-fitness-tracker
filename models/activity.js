const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {type: String, required: true},
    stats: [{
      day: {type: Date, required: true, default: Date.now},
      number: {type: Number, required: true},
      units: {type: String, required: true}
    }],
    user: {type: mongoose.Schema.ObjectId, required: true}
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
