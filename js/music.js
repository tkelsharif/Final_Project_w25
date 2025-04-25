document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const playButton = document.getElementById('music-btn'); 
    let isPlaying = false;

   
    playButton.src = "images/music-removebg-preview.png"; 

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                isPlaying = true;
                playButton.src = "images/music-removebg-preview.png"; 
                console.log("Audio is now playing!");
            }).catch(error => {
                console.error("Failed to play audio:", error);
            });
        } else {
            audio.pause();
            isPlaying = false;
            playButton.src = "images/music-removebg-preview.png";
            console.log("Audio is paused.");
        }
    });

    audio.onplay = () => {
        console.log("Audio started playing on page load.");
    };

    audio.onpause = () => {
        console.log("Audio is paused on page load.");
    };
});