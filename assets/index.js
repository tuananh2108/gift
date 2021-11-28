const contentStart = document.querySelector(".content-start");
const content = document.querySelector(".content-main");
const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const audio = document.getElementById('audio');
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const titleMain = document.getElementById('title-main');
const btn = document.querySelector(".btn");
const btn0 = document.querySelector(".btn-0");
const btn1 = document.querySelector(".btn-1");
const btn2 = document.querySelector(".btn-2");
const btn3 = document.querySelector(".btn-3");
const btnOpen = document.querySelector(".btn-open");

btn0.onclick = function() {
    btn0.style.display = 'none';
    btn1.style.display = 'block';
    btn.style.zIndex = "10";
}

btn1.onclick = function() {
    btn1.style.display = 'none';
    btn2.style.display = 'block';
}

btn2.onclick = function() {
    btn2.style.display = 'none';
    btn3.style.display = 'block';
}

btnOpen.onclick = function() {
    btn.style.display = 'none';
    btn.style.zIndex = "-1";
    contentStart.style.display = 'none';
    content.style.display = 'block';
};

// tên bài hát
//song name
const songs = [
    "We Don't Talk Anymore",
    "Despacito"
]

// keep track of songs

let songIndex = 0
//Initially load song from DOM

loadSong(songs[songIndex])
// update song details

function loadSong(song) {
    title.innerHTML = song
    audio.src = `./assets/audio/${song}.mp3`
    cover.src = `./assets/img/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    titleMain.style.opacity = 0
    titleMain.style.transition = 'opacity 0s ease-out'

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    titleMain.style.opacity = 1
    titleMain.style.transition = 'opacity 0.75s ease-in'

    audio.pause()
}

function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// event listener
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play")
    
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// change song cover event
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)