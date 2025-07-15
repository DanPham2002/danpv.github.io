const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progress = document.getElementById('progress');
const time = document.getElementById('time');
const titleEl = document.querySelector('.title');
const artistEl = document.querySelector('.artist');
const imageEl = document.querySelector('.images-play');
const latestRelease = document.getElementById('latest-release');
const themeBtn = document.getElementById('toggle-theme');
let currentIndex = 0;
let isRepeat = false;
let repeatMode = 0;

const playlist = [
  {
    title: "Da Capo",
    artist: "HOYO-MIX",
    image: "images/unnamed.jpg",
    src: "mp3/Da Capo.mp3"
  },
  {
    title: "Moon Halo",
    artist: "HOYO-MIX",
    image: "images/unnamed.jpg",
    src: "mp3/Moon Halo.mp3"
  },
  {
    title: "Rubia",
    artist: "HOYO-MIX",
    image: "images/unnamed.jpg",
    src: "mp3/Rubia.mp3"
  },
   {
    title: "Nightglow",
    artist: "HOYO-MIX",
    image: "images/unnamed.jpg",
    src: "mp3/Nightglow.mp3"
  },
   {
    title: "Starfall",
    artist: "HOYO-MIX",
    image: "images/unnamed.jpg",
    src: "mp3/Starfall.mp3"
  },
   {
    title: "Oracle",
    artist: "HOYO-MIX",
    image: "images/unnamed.jpg",
    src: "mp3/Oracle.mp3"
  },
   {
    title: "TruE",
    artist: "HOYO-MIX",
    image: "images/unnamed.jpg",
    src: "mp3/TruE.mp3"
  },
   {
    title: "Regression",
    artist: "HOYO-MIX",
    image: "images/unnamed.jpg",
    src: "mp3/Regression.mp3"
  },
   {
    title: "Honkai Gods",
    artist: "HI3rd",
    image: "images/unnamed.jpg",
    src: "mp3/Honkai Gods.mp3"
  },
   {
    title: "Cyberangel",
    artist: "HOYO-MIX",
    image: "images/unnamed.jpg",
    src: "mp3/Cyberangel.mp3"
  }
];

playlist.forEach((song, index) => {
  latestRelease.innerHTML += `
    <div class="col-md-3 mb-4">
      <div class="card p-3 card-all">
        <img src="${song.image}" class="card-img-top" alt="${song.title}">
        <div class="card-body">
          <h5 class="card-title">${song.title}</h5>
          <p class="card-text">${song.artist}</p>
          <button class="btn btn-outline-light btn-sm play-card" data-index="${index}">
            <i class="fa-solid fa-play"></i> 
          </button>
        </div>
      </div>
    </div>
  `;
});

document.querySelectorAll('.play-card').forEach(btn => {
  btn.addEventListener('click', function() {
    const index = this.dataset.index;
    currentIndex = parseInt(index);
    loadSong(currentIndex);
    audio.play();
    playBtn.textContent = '⏸';
  });
})



// Load bài hát
function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  audio.load();
  playBtn.textContent = '▶';

  // Thay đổi thông tin động
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  imageEl.src = song.image;
}


// Play/Pause
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
};

// Repeat toggle
repeatBtn.onclick = () => {
  repeatMode = (repeatMode + 1) % 3;

  if (repeatMode === 0) {
    repeatBtn.textContent = '🔀'; // Chuyển tiếp
    repeatBtn.style.color = '#fff';
    audio.loop = false;
  } else if (repeatMode === 1) {
    repeatBtn.textContent = '🔁'; // Lặp toàn bộ
    repeatBtn.style.color = '#1db954';
    audio.loop = false;
  } else if (repeatMode === 2) {
    repeatBtn.textContent = '🔂'; // Lặp 1 bài
    repeatBtn.style.color = '#f39c12';
    audio.loop = true;
  }
};

// Update progress & time
audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  let mins = Math.floor(audio.currentTime / 60);
  let secs = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  time.textContent = `${mins}:${secs}`;
};

// Seek
progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

// Next
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
};

// Prev
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
};

// Auto next
audio.onended = () => {
  if (repeatMode === 1) {
    // Lặp danh sách
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
  } else if (repeatMode === 0) {
    // Không lặp -> chỉ phát tiếp nếu chưa hết
    if (currentIndex + 1 < playlist.length) {
      currentIndex++;
      loadSong(currentIndex);
    }
  }
  // repeatMode === 2 thì `audio.loop = true` đã lo
};

// Load bài đầu
loadSong(currentIndex);


//chủ đề
// Khi load:
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeBtn.classList.remove('fa-moon');
  themeBtn.classList.add('fa-sun');
}

// Khi toggle:
themeBtn.onclick = () => {
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    themeBtn.classList.remove('fa-moon');
    themeBtn.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    themeBtn.classList.remove('fa-sun');
    themeBtn.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
};