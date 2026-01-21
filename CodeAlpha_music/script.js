const songs = [
  {
    title: "Song 1: dark-cyberpunk-i-free-background-music",
    artist: "Artist One",
    src: "song1.mp3",
    cover: "music1.jpg"
  },
  {
    title: "Song 2: Nenjukkul Peidhidum BGM",
    artist: "Artist Two",
    src: "song2.mp3",
     cover: "music2.jpg"
  },
   {
    title: "Song 3: Kanmoodi Thirakkumpothu BGM",
    artist: "Artist Three",
    src: "song3.mp3",
     cover: "music3.jpg"
  },
   {
    title: "Song 4: background-music-new-age-nature",
    artist: "Artist Four",
    src: "song4.mp3",
     cover: "music4.jpg"
  },
   {
    title: "Song 5:Animal Movie Entry BGM ",
    artist: "Artist Five",
    src: "song5.mp3",
     cover: "music5.jpg"
  },
   {
    title: "Song 6:demon-slayer-akaza-amp",
    artist: "Artist Six",
    src: "song6.mp3",
     cover: "music6.jpg"
  }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");
const albumCover = document.getElementById("albumCover");


function loadSong(index) {
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  audio.src = songs[index].src;
  albumCover.src = songs[index].cover;
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸"; // pause icon
  } else {
    audio.pause();
    playBtn.textContent = "▶"; // play icon
  }
}


function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";

}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";

}

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

function setVolume(value) {
  audio.volume = value;
}

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

// autoplay
audio.addEventListener("ended", () => {
  nextSong();
  playBtn.textContent = "⏸";
});


// playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.onclick = () => {
    currentSong = index;
    loadSong(currentSong);
    audio.play();
  };
  playlistEl.appendChild(li);
});

loadSong(currentSong);
