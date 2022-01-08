let songs = [
    {songName: "Warriyo - Mortals",songDuration:"03:50", filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName: "Bijlee-Bijlee",songDuration:"02:48", filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName: "Rait Zara Si",songDuration:"04:51", filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName: "Excuses - AP Dhillon",songDuration:"02:56", filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName: "Jug Jug Jeeve",songDuration:"03:19", filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName: "Pehli Mohabbat",songDuration:"04:04", filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName: "Insane - AP Dhillon",songDuration:"03:26", filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName: "Lily - Alan Walker",songDuration:"03:16", filePath:"songs/8.mp3",coverPath:"covers/8.jpg"}
]

let audioElement = new Audio('songs/1.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let previous = document.getElementById('previousButton');
let next = document.getElementById('nextButton');
let masterSongName = document.getElementById('masterSongName');
let progressBar = document.getElementById('myProgressBar');
let musicGif = document.getElementById('musicGif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

//initialise song list to display
songItems.forEach((song,i) => {
  song.getElementsByTagName("img")[0].src = songs[i].coverPath;
  song.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  song.getElementsByClassName("duration")[0].innerText = songs[i].songDuration;
})

//handle play pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        musicGif.style.opacity = 1;
        makeSongPlay(songIndex);
    }else{
        musicGif.style.opacity = 0;
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        makePreviousSongPause(songIndex);
    }
});

previous.addEventListener('click', () => {
    makePreviousSongPause(songIndex);
    changeSongIndex(-1);
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    makeSongPlay(songIndex);
});

next.addEventListener('click', () => {
    makePreviousSongPause(songIndex);
    changeSongIndex(1);
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    makeSongPlay(songIndex);
})

const changeSongIndex = (value) => {
    songIndex = songIndex+value;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }else if(songIndex == songs.length){
        songIndex = 0;
    }
}

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    if(isNaN(audioElement.duration)){
        progressBar.value = 0;
    }else{
        progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
        progressBar.value = progress;
    }
});

progressBar.addEventListener('change',()=> {
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeSongPlay = index => {
    songElement = Array.from(document.getElementsByClassName('songItemPlay'))[index];
    songElement.classList.remove('fa-play-circle');
    songElement.classList.add('fa-pause-circle');
}

const makePreviousSongPause = (index) => {
    previousSongElement = Array.from(document.getElementsByClassName('songItemPlay'))[index];
    previousSongElement.classList.add('fa-play-circle');
    previousSongElement.classList.remove('fa-pause-circle');
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i) => {
    element.addEventListener('click', (e) => {
        if(songIndex!=i){
            makePreviousSongPause(songIndex);
            songIndex = i;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
        }
        
        //play button clicked
        if(e.target.classList.contains('fa-play-circle')){
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            musicGif.style.opacity = 1;
            audioElement.play();
        }else{
            //pause button clicked
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            musicGif.style.opacity = 0;
            audioElement.pause();
        }
    })
})