// Select elements
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip forward/backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle range inputs (volume & playbackRate)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub video position on click
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

progress.addEventListener('click', scrub);
