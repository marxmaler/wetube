const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;

let controlsMovementTimeout = null;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
    playBtnIcon.classList.remove("fa-play");
    playBtnIcon.classList.add("fa-pause");
  } else {
    video.pause();
    playBtnIcon.classList.remove("fa-pause");
    playBtnIcon.classList.add("fa-play");
  }
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList.remove("fa-volume-mute");
    muteBtnIcon.classList.add("fa-volume-up");
  } else {
    video.muted = true;
    muteBtnIcon.classList.remove("fa-volume-up");
    muteBtnIcon.classList.add("fa-volume-mute");
  }
  volumeRange.value = video.muted ? 0 : volumeValue;
};

function handleVolumeChange(event) {
  const {
    target: { value },
  } = event;

  if (value !== "0" && video.muted) {
    video.muted = false;
    muteBtnIcon.classList.remove("fa-volume-mute");
    muteBtnIcon.classList.add("fa-volume-up");
  }
  if (value === "0" && !video.muted) {
    video.muted = true;
    muteBtnIcon.classList.remove("fa-volume-up");
    muteBtnIcon.classList.add("fa-volume-mute");
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
    fullScreenBtnIcon.classList.remove("fa-compress");
    fullScreenBtnIcon.classList.add("fa-expand");
  } else {
    //전체 화면 상태인 element가 없을 때
    videoContainer.requestFullscreen();
    fullScreenBtnIcon.classList.remove("fa-expand");
    fullScreenBtnIcon.classList.add("fa-compress");
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

const textarea = document.querySelector(".video__add-comments textarea");
const disableKeydownListener = () => {
  document.removeEventListener("keydown", handleKeydown);
};
const enableKeydownListener = () => {
  document.addEventListener("keydown", handleKeydown);
};
textarea.addEventListener("focusin", disableKeydownListener);
textarea.addEventListener("focusout", enableKeydownListener);
const handleKeydown = (event) => {
  if (event.code === "Space") {
    handlePlayClick();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("change", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("canplay", handleLoadedMetaData);
handleLoadedData();
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayClick);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
document.addEventListener("keydown", handleKeydown);
