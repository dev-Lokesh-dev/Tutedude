const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  videoId: String,
  watchedIntervals: [
    {
      start: Number,
      end: Number,
    },
  ],
  lastWatchedPosition: Number,
  totalDuration: Number,
  percentageWatched: Number,
});

module.exports = mongoose.model('Progress', progressSchema);