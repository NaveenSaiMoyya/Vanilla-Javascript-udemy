const video = document.getElementById("video");
const play = document.getElementById("play");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const Stop = document.getElementById("stop");
const volumeUp = document.getElementById("plus");
const volumeDown = document.getElementById("minus");
const volume = document.getElementById("volume");

video.volume = 0.1;
volume.innerText = video.volume * 10;

//play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update play & pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

//update progress and timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

//set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

//stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//set volume Up
function setVolumeUp() {
  video.volume += 0.1;
  volume.innerText = Math.floor(video.volume * 10);
}

//set volume Up
function setVolumeDown() {
  video.volume -= 0.1;
  volume.innerText = Math.floor(video.volume * 10);
}

//Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

Stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);

volumeUp.addEventListener("click", setVolumeUp);
volumeDown.addEventListener("click", setVolumeDown);
