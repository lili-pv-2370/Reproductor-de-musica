const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Info Canciones
const songs =
[
    {
        title: 'Typa Girl',
        artist: 'BLACKPINK',
        coverPath: 'imagen/Portada1.jpg',
        discPath: 'Audio/audio1.mp3',
        duration: '2:59',
    },
    {
        title: 'Dont Start Now',
        artist: 'Dua Lipa',
        coverPath: 'imagen/Portada2.jpg',
        discPath: 'Audio/audio2.mp3',
        duration: '3:00',
    },
    {
        title: 'As It Was',
        artist: 'Harry Styles',
        coverPath: 'imagen/Portada3.jpg',
        discPath: 'Audio/audio3.mp3',
        duration: '2:45',
    },
];

// Lectura de Cancion
loadSong(songs[songIndex]);

// Funcion Informacion Cancion
function loadSong(song)
    {
        cover.src = song.coverPath;
        disc.src = song.discPath;
        title.textContent = song.title;
        artist.textContent = song.artist;
        duration.textContent = song.duration;
    }

// Funcion Reproducir/Pausar
function playPauseMedia()
    {
        if (disc.paused)
            {
                disc.play();
            }
        else
            {
                disc.pause();
            }
    }

// funcion para actualizar el icono
function updatePlayPauseIcon()
    {
        if (disc.paused)
            {
                play.classList.remove('fa-pause');
                play.classList.add('fa-play');
            }
        else
            {
                play.classList.remove('fa-play');
                play.classList.add('fa-pause');
            }
    }

// Funcion para actualizar la barra de estado 
function updateProgress()
    {
        progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';
        let minutes = Math.floor(disc.currentTime / 60);
        let seconds = Math.floor(disc.currentTime % 60);
        if (seconds < 10)
            {
                seconds = '0' + seconds;
            }
        timer.textContent = `${minutes}:${seconds}`;
    }

// Funcion para inicializar el progreso
function resetProgress()
    {
        progress.style.width = 0 + '%';
        timer.textContent = '0:00';
    }

// Funcion Cancion Anterior
function gotoPreviousSong()
    {
        if (songIndex === 0)
            {
                songIndex = songs.length - 1;
            }
        else
            {
                songIndex = songIndex - 1;
            }
        const isDiscPlayingNow = !disc.paused;
        loadSong(songs[songIndex]);
        resetProgress();
        if (isDiscPlayingNow)
            {
                playPauseMedia();
            }
    }      

// Funcion Cancion Siguiente
function gotoNextSong(playImmediately)
    {
        if (songIndex === songs.length - 1)
            {
                songIndex = 0;
            }
        else
            {
                songIndex = songIndex + 1;
            }   
    const isDiscPlayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDiscPlayingNow || playImmediately)
        {
            playPauseMedia();
        }
    }

// Funcion para ajustar la cancion con la barra de estado
function setProgress(ev)
    {
        const totalWidth = this.clientWidth;
        const clickWidth = ev.offsetX;
        const clickWidthRatio = clickWidth / totalWidth;
        disc.currentTime = clickWidthRatio * disc.duration;
    }

// Reproducir/Pausar cuando se presiona el boton 
play.addEventListener('click', playPauseMedia);

// Visualizacion de los cambios de los iconos al ser utilzados 
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Cancion anterior al presionar
prev.addEventListener('click', gotoPreviousSong);

// Cancion siguiente al presionar
next.addEventListener('click', gotoNextSong.bind(null, false));

// Actualizacion de la cancion al presionar la barra de estado
progressContainer.addEventListener('click', setProgress);