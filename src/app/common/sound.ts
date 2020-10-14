export function playBuzzer(): void {
    const audio = new Audio();
    audio.src = './assets/sounds/buzzer.mp3';
    audio.load();
    audio.play();
}

export function playWordFound(): void {
    const audio = new Audio();
    audio.src = './assets/sounds/found-letter.mp3';
    audio.load();
    audio.play();
}

export function playWin(): void {
    const audio = new Audio();
    audio.src = './assets/sounds/win.mp3';
    audio.load();
    audio.play();
}

export function playTick(): void {

    // Loads the tick audio sound in to an audio object.
    const audio = new Audio('./assets/sounds/tick.mp3');

    // Stop and rewind the sound if it already happens to be playing.
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
}
