const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;

let controlsMovementTimeout = null;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    video.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
    muteBtn.classList.remove("fa-volume-mute");
    muteBtn.classList.add("fa-volume-up");
  } else {
    video.muted = true;
    muteBtn.classList.remove("fa-volume-up");
    muteBtn.classList.add("fa-volume-mute");
  }
  volumeRange.value = video.muted ? 0 : volumeValue;
};

function handleVolumeChange(event) {
  const {
    target: { value },
  } = event;

  if (value !== "0" && video.muted) {
    video.muted = false;
    muteBtn.classList.remove("fa-volume-mute");
    muteBtn.classList.add("fa-volume-up");
  }
  if (value === "0" && !video.muted) {
    video.muted = true;
    muteBtn.classList.remove("fa-volume-up");
    muteBtn.classList.add("fa-volume-mute");
  }

  volumeValue = value;
  video.volume = value;
}

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.classList.remove("fa-compress");
    fullScreenBtn.classList.add("fa-expand");
  } else {
    //전체 화면 상태인 element가 없을 때
    videoContainer.requestFullscreen();
    fullScreenBtn.classList.remove("fa-expand");
    fullScreenBtn.classList.add("fa-compress");
  }
};

const hideControls = () => videoControls.classList.remove("showing");
const showControls = () => videoControls.classList.add("showing");

const handleMouseMove = () => {
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  showControls();
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  hideControls();
};

const handleKeydown = (event) => {
  if (event.code === "Space") {
    handlePlayClick();
  }
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("change", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayClick);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
document.addEventListener("keydown", handleKeydown);
