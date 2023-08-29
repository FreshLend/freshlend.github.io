var feedUrl = "https://api.boosty.to/v1/blog/freshgame.com/rss/feed/d660a0b4-d439-4c46-ae4f-b43ea476ac34";
var audio = document.getElementById("music");
var trackNameElement = document.getElementById("trackName");
var currentTrackIndex = 0;
var tracks = [];

fetch(feedUrl)
  .then(response => response.text())
  .then(data => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "text/xml");
    var items = xmlDoc.getElementsByTagName("item");
    for (var i = 0; i < items.length; i++) {
      var title = items[i].getElementsByTagName("title")[0].textContent;
      var url = items[i].getElementsByTagName("enclosure")[0].getAttribute("url");
      tracks.push({ name: title, url: url });
    }
    updateTrackName();
  });

function updateTrackName() {
 // trackNameElement.textContent = tracks[currentTrackIndex].name;
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