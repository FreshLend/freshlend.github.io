var tracks = [
  { name: "Space Survival", url: "Space_Survival.mp3" }
];
var currentTrackIndex = 0;
var audio = document.getElementById("music");
var trackNameElement = document.getElementById("trackName");

function updateTrackName() {
  trackNameElement.textContent = tracks[currentTrackIndex].name;
}

function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function previousTrack() {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = tracks.length - 1;
  }
  audio.src = tracks[currentTrackIndex].url;
  audio.play();
  updateTrackName();
}

function nextTrack() {
  currentTrackIndex++;
  if (currentTrackIndex >= tracks.length) {
    currentTrackIndex = 0;
  }
  audio.src = tracks[currentTrackIndex].url;
  audio.play();
  updateTrackName();
}
