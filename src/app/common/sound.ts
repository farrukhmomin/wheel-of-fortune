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
