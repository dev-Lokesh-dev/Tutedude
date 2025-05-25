const video = document.getElementById('video');
const fill = document.getElementById('fill');
const videoId = 'lecture-101';

let totalDuration = 0;
let bufferStart = null;
let lastTime = 0;
let lastReportedTime = 0;

async function getProgress() {
  const res = await fetch(`http://localhost:3000/progress/${videoId}`);
  return res.json();
}

async function updateProgress(start, end) {
  if (start === end) return;

  await fetch(`http://localhost:3000/progress/${videoId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start, end, totalDuration }),
  })
    .then((r) => r.json())
    .then((data) => {
      fill.style.width = `${data.percentageWatched}%`;
    });
}

video.addEventListener('loadedmetadata', async () => {
  totalDuration = Math.floor(video.duration);
  const progress = await getProgress();
  fill.style.width = `${progress.percentageWatched}%`;
  video.currentTime = progress.lastWatchedPosition || 0;
});

video.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(video.currentTime);

  const delta = Math.abs(currentTime - lastTime);
  if (delta > 2) {
   
    bufferStart = null;
  } else {
  
    if (bufferStart === null) bufferStart = lastTime;
    if (Math.abs(currentTime - lastReportedTime) >= 5) {
      updateProgress(bufferStart, currentTime);
      lastReportedTime = currentTime;
      bufferStart = currentTime;
    }
  }

  lastTime = currentTime;
});

video.addEventListener('pause', () => {
  const end = Math.floor(video.currentTime);
  if (bufferStart !== null) {
    updateProgress(bufferStart, end);
    bufferStart = null;
  }
});
