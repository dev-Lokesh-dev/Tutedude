const Progress = require('../models/progressModel');

function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a.start - b.start);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i].start <= last.end) {
      last.end = Math.max(last.end, intervals[i].end);
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
}

exports.getProgress = async (req, res) => {
  const { videoId } = req.params;
  const record = await Progress.findOne({ videoId });
  if (!record) return res.json({ watchedIntervals: [], percentageWatched: 0, lastWatchedPosition: 0 });
  res.json(record);
};

exports.updateProgress = async (req, res) => {
  const { videoId } = req.params;
  const { start, end, totalDuration } = req.body;

  let progress = await Progress.findOne({ videoId });
  if (!progress) {
    progress = new Progress({ videoId, watchedIntervals: [], totalDuration });
  }
  const updatedIntervals = [...progress.watchedIntervals, { start, end }];
  const merged = mergeIntervals(updatedIntervals);
  const uniqueSeconds = merged.reduce((acc, { start, end }) => acc + (end - start), 0);

  progress.watchedIntervals = merged;
  progress.lastWatchedPosition = end;
  progress.percentageWatched = Math.min(100, ((uniqueSeconds / totalDuration) * 100).toFixed(2));
  progress.totalDuration = totalDuration;

  await progress.save();
  res.json(progress);
};
